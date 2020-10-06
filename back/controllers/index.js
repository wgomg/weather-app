'use strict';

const fs = require('fs');
const path = require('path');

let controllers = {};

fs.readdirSync(__dirname).forEach((file) => {
  if (file.includes(path.basename(__filename))) return;

  const fileName = path.basename(file, path.extname(file));
  controllers[fileName] = require('./' + fileName);
});

module.exports = controllers;
