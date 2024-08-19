const express = require('express');
const indexRouter = require('./routes/indexRouter');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/', indexRouter);
app.listen(PORT);
