'use strict';

const mock = require('egg-mock');

describe('test/single_client.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/dynamodb-single-client',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect(200);
  });
});
