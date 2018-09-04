'use strict';

function proxyWrapper(obj, property) {
  if (typeof obj[property] === 'function') {
    return (...argvs) => {
      return obj[property](...argvs).promise();
    };
  }
  return obj[property];
}

let count = 0;

module.exports = app => {
  app.addSingleton('dynamodb', createOneClient);
};

function createOneClient(config, app) {
  const client = new app.AWS.DynamoDB(config);
  const docClient = new app.AWS.DynamoDB.DocumentClient(config, client);

  const clientWrapper = new Proxy(client, { get: proxyWrapper });
  const docClientWrapper = new Proxy(docClient, { get: proxyWrapper });
  docClientWrapper.client = clientWrapper;

  app.beforeStart(async () => {
    const res = await clientWrapper.describeLimits({});
    const index = count++;
    app.coreLogger.info(`[egg-dynamodb] instance[${index}] status OK, ${JSON.stringify(res)}`);
  });

  return docClientWrapper;
}
