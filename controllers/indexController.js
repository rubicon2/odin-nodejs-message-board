import Message from '../models/Message.js';
import { Filter } from 'bad-words';
import { body, validationResult } from 'express-validator';

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

const filter = new Filter();
const validateNew = [
  body('user')
    .trim()
    .notEmpty()
    .withMessage('Name field cannot be empty')
    .isAlpha()
    .withMessage('Name field must use alphabetical characters only')
    .custom((value) => !filter.isProfane(value))
    .withMessage('Name field contained offensive language')
    .escape(),
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Message field cannot be empty')
    .custom((value) => !filter.isProfane(value))
    .withMessage('Message field contained offensive language')
    .escape(),
];

const postNew = [
  validateNew,
  async (req, res, next) => {
    try {
      const result = validationResult(req);
      const { user, text } = req.body;
      if (!result.isEmpty()) {
        res.status(400).render('rejected', {
          errors: result.array(),
          user,
          text,
          cleanUser: filter.clean(user),
          cleanText: filter.clean(text),
          title: 'Message rejected',
        });
      } else {
        await Message.create({
          user,
          text,
          added: new Date(),
        });
        res.redirect('/');
      }
    } catch (error) {
      next(error);
    }
  },
];

function getRejected(req, res) {
  const { user, text, cleanUser, cleanText } = req.query;
  res.render('rejected', {
    user,
    text,
    cleanUser,
    cleanText,
    title: 'Message rejected',
  });
}

export { getIndex, getMessage, deleteMessage, getNew, postNew, getRejected };
