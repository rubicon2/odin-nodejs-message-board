const { v4: uuid } = require('uuid');

const messages = [
  {
    id: uuid(),
    text: 'Hi there!',
    user: 'Jacqueline',
    added: new Date('01-01-2024'),
  },
  {
    id: uuid(),
    text: 'I have no interest in you whatsoever.',
    user: 'Miho',
    added: new Date('03-13-2024'),
  },
  {
    id: uuid(),
    text: 'Cheese is a type of dairy product produced in a range of flavors, textures, and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk (usually the milk of cows, buffalo, goats or sheep). During production, milk is usually acidified and either the enzymes of rennet or bacterial enzymes with similar activity are added to cause the casein to coagulate. The solid curds are then separated from the liquid whey and pressed into finished cheese.[1] Some cheeses have aromatic molds on the rind, the outer layer, or throughout.',
    user: 'Longman',
    added: new Date(),
  },
];

function getIndex(req, res) {
  const newestFirst = messages.sort(
    (a, b) => b.added.getTime() - a.added.getTime(),
  );
  res.render('index', { messages: newestFirst, title: 'Mini Messageboard' });
}

function getMessage(req, res, next) {
  const { id } = req.params;
  try {
    const message = messages.find((currentMsg) => id === currentMsg.id);
    res.render('message', { message, title: `Message by ${message.user}` });
  } catch (error) {
    next(error);
  }
}

function getNew(req, res) {
  res.render('form', { title: 'Mini Messageboard' });
}

function postNew(req, res) {
  const { user, text } = req.body;
  messages.push({ id: uuid(), user, text, added: new Date() });
  res.redirect('/');
}

module.exports = { getIndex, getMessage, getNew, postNew };
