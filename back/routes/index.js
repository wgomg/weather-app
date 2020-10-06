'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file.includes(path.basename(__filename))) return;

    let name = path.basename(file, path.extname(file));
    require('./' + name)(app);
  });
};
