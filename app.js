import express from 'express';
import { default as indexRouter } from './routes/indexRouter.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/', indexRouter);

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
