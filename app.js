const express = require('express');
require('dotenv').config();

const indexRouter = require('./routes/indexRouter');

const PORT = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/', indexRouter);
app.listen(PORT);
