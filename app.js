const express = require('express');
require('dotenv').config();

const indexRouter = require('./routes/indexRouter');

const PORT = process.env.PORT || 3000;

const app = express();
app.use('/', indexRouter);
app.listen(PORT);
