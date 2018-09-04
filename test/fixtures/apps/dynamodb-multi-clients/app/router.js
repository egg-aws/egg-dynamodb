'use strict';

module.exports = app => {
  const { router } = app;

  router.get('/dynamodb1', 'home.dynamodb1');
  router.get('/dynamodb2', 'home.dynamodb2');
};
