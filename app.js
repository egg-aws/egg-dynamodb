'use strict';

const dynamodb = require('./lib/dynamodb.js');

module.exports = app => {
  dynamodb(app);
};
