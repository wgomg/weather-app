'use strict';

const express = require('express');
const compression = require('compression');

const path = require('path');

const app = express();

app.use(express.json({ extended: false }));
app.use(compression());

require('./routes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'front', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve('front', 'build', 'index.html'));
  });
}

module.exports = app;
