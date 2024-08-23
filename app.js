import express from 'express';
import { default as indexRouter } from './routes/indexRouter.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { query, validationResult } from 'express-validator';

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB);

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/', indexRouter);

app.get('/v', query('person').notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }

  res.send({ errors: result.array() });
});

// Error handling.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render('error', { error, title: 'Error' });
});

// 404.
app.use((req, res) => {
  res
    .status(404)
    .render('error', { error: '404: Page not found', title: 'Error' });
});

app.listen(PORT);
