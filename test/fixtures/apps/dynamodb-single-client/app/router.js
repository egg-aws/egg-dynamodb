'use strict';

module.exports = app => {
  const { router } = app;

  router.get('/', 'home.index');
};
