'use strict';

const mock = require('egg-mock');

describe('test/dynamodb-multi-clients.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/dynamodb-multi-clients',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /dynamodb1', () => {
    return app.httpRequest()
      .get('/dynamodb1')
      .expect(200);
  });

  it('should GET /dynamodb2', () => {
    return app.httpRequest()
      .get('/dynamodb2')
      .expect(200);
  });
});
