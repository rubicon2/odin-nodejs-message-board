const Message = require('../models/Message');

async function getIndex(req, res, next) {
  try {
    // find (and sort) returns a query, but exec() turns it into a promise. Works without exec, but using it anyway as I know what to expect with promises!
    const messages = await Message.find({}).sort({ added: 'desc' }).exec();
    res.render('index', { messages, title: 'Mini Messageboard' });
  } catch (error) {
    next(error);
  }
}

async function getMessage(req, res, next) {
  const { id } = req.params;
  try {
    // findById returns a query, but exec() turns it into a promise. Works without exec, but using it anyway as I know what to expect with promises!
    const message = await Message.findById(id).exec();
    res.render('message', { message, title: `Message by ${message.user}` });
  } catch (error) {
    next(error);
  }
}

async function deleteMessage(req, res, next) {
  try {
    await Message.deleteOne({ _id: req.params.id });
    // The clientside script will redirect. Couldn't get res.redirect() to work here - req.method seems to be stuck on DELETE.
    // Even if I change it manually, it still makes a DELETE request.
    next();
  } catch (error) {
    next(error);
  }
}

function getNew(req, res) {
  res.render('form', { title: 'Mini Messageboard' });
}

async function postNew(req, res, next) {
  try {
    const { user, text } = req.body;
    await Message.create({
      user,
      text,
      added: new Date(),
    });
    res.redirect('/');
  } catch (error) {
    next(error);
  }
}

module.exports = { getIndex, getMessage, deleteMessage, getNew, postNew };
