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
  res.send('Got new!');
}

module.exports = { getIndex, getNew };
