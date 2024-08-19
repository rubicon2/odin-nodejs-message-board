const messages = [
  {
    text: 'Hi there!',
    user: 'Jacqueline',
    added: new Date(),
  },
  {
    text: 'I have no interest in you whatsoever.',
    user: 'Miho',
    added: new Date(),
  },
];

function getIndex(req, res) {
  res.render('index', { messages, title: 'Mini Messageboard' });
}

function getNew(req, res) {
  res.render('form', { title: 'Mini Messageboard' });
}

function postNew(req, res) {
  const { user, text } = req.body;
  messages.push({ user, text, added: new Date() });
  res.redirect('/');
}

module.exports = { getIndex, getNew, postNew };
