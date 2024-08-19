const { v4: uuid } = require('uuid');

const messages = [
  {
    id: uuid(),
    text: 'Hi there!',
    user: 'Jacqueline',
    added: new Date(),
  },
  {
    id: uuid(),
    text: 'I have no interest in you whatsoever.',
    user: 'Miho',
    added: new Date(),
  },
];

function getIndex(req, res) {
  res.render('index', { messages, title: 'Mini Messageboard' });
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
