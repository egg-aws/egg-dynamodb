# egg-dynamodb

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-dynamodb.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-dynamodb
[travis-image]: https://travis-ci.com/egg-aws/egg-dynamodb.svg?branch=master
[travis-url]: https://travis-ci.com/egg-aws/egg-dynamodb
[codecov-image]: https://img.shields.io/codecov/c/github/egg-aws/egg-dynamodb.svg?style=flat-square
[codecov-url]: https://codecov.io/github/egg-aws/egg-dynamodb?branch=master
[david-image]: https://img.shields.io/david/egg-aws/egg-dynamodb.svg?style=flat-square
[david-url]: https://david-dm.org/egg-aws/egg-dynamodb
[snyk-image]: https://snyk.io/test/npm/egg-dynamodb/badge.svg
[snyk-url]: https://snyk.io/test/npm/egg-dynamodb
[download-image]: https://img.shields.io/npm/dm/egg-dynamodb.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-dynamodb

Dynamodb plugin for Eggjs.

## Install

```bash
$ npm i egg-dynamodb --save
```

## Example

We can easily get the description of a table like below:

```js
  const params = {
    TableName: "test_table",
  };
  const tableDescription = await app.dynamodb.client.describeTable(params);
```

We can also put an item into a table like this:

```js
  const param = {
    TableName : 'test_table',
    Item: {
      HashKey: 'haskey',
      NumAttribute: 1,
    }
  };

  await app.dynamodb.put(param);
```

As you can see, `app.dynamodb` is the [DynamoDB DocumentClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html) and `app.dynamodb.client` is the [DynamoDB low level client](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html).

## Configuration

Enable plugin:

```js
// {app_root}/config/plugin.js
exports.dynamodb = {
  enable: true,
  package: 'egg-dynamodb',
};
```

Additionally, egg-dynamodb depend on `egg-aws-sdk`, so we must add the following config:

```js
// {app_root}/config/plugin.js
exports.awsSdk = {
  enable: true,
  package: 'egg-aws-sdk',
};
```

and don't forget to install the `egg-aws-sdk` as a dependency:

```
$ npm i egg-aws-sdk --save
```

Configure the dynamodb client:

```js
// {app_root}/config/config.default.js
exports.dynamodb = {
  client: {
    endpoint: '',
    region: '',
    accessKeyId: '',
    secretAccessKey: '',
  },
  // or multi clients
  // clients: {
  //   dynamodb1: {
  //     endpoint: '',
  //     region: '',
  //     accessKeyId: '',
  //     secretAccessKey: '',
  //   },
  //   dynamodb2: {
  //     endpoint: '',
  //     region: '',
  //     accessKeyId: '',
  //     secretAccessKey: '',
  //   },
  // },
};
```

## Usage

### Single Client

You can use `app.dynamodb` to get the dynamodb instance.

```js
// app/controller/home.js

module.exports = app => {
  return class HomeController extends app.Controller {
    async index() {
      const { ctx, app } = this;
      const param = {
        TableName : 'test_table',
        Item: {
          HashKey: 'haskey',
          NumAttribute: 1,
        }
      };
      await app.dynamodb.put(param);
    }
  };
};
```

### Multi Clients

If your Configure with multi clients, you can use `app.dynamodb.get('instanceName')` to get the specific dynamodb instance and use it like above.

```js
// app/controller/home.js

module.exports = app => {
  return class HomeController extends app.Controller {
    async index() {
      const { ctx, app } = this;
      const param = {
        TableName : 'test_table',
        Item: {
          HashKey: 'haskey',
          NumAttribute: 1,
        }
      };
      await app.dynamodb.get('instance1').put(param);
    }
  };
};

```

### API

The original aws interface does not provide the straight promise support, we must invoke the `.promise()` to get the promise object. It is not very convenient to use. In order to simplify the usage, egg-dynamodb wrap all the interface making them auto return the promise object which means we can directly `await` any function.

#### DynamoDB Client

- [Async batchGetItem(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#batchGetItem-property) 
- [Async batchWriteItem(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#batchWriteItem-property) 
- [Async createBackup(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createBackup-property) 
- [Async createGlobalTable(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createGlobalTable-property) 
- [Async createTable(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createTable-property) 
- [Async deleteBackup(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteBackup-property) 
- [Async deleteItem(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteItem-property) 
- [Async deleteTable(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteTable-property) 
- [Async describeBackup(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeBackup-property) 
- [Async describeContinuousBackups(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeContinuousBackups-property) 
- [Async describeGlobalTable(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeGlobalTable-property) 
- [Async describeGlobalTableSettings(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeGlobalTableSettings-property) 
- [Async describeLimits(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeLimits-property) 
- [Async describeTable(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeTable-property) 
- [Async describeTimeToLive(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#describeTimeToLive-property) 
- [Async getItem(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#getItem-property) 
- [Async listBackups listGlobalTables(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listBackups-property) 
- [Async listTables(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listTables-property) 
- [Async listTagsOfResource(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listTagsOfResource-property) 
- [Async putItem(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property) 
- [Async query(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property) 
- [Async restoreTableFromBackup(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#restoreTableFromBackup-property) 
- [Async restoreTableToPointInTime(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#restoreTableToPointInTime-property) 
- [Async scan(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#scan-property) 
- [Async tagResource untagResource(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#tagResource-property) 
- [Async updateContinuousBackups(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateContinuousBackups-property) 
- [Async updateGlobalTable(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateGlobalTable-property) 
- [Async updateGlobalTableSettings(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateGlobalTableSettings-property) 
- [Async updateItem(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateItem-property) 
- [Async updateTable(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateTable-property) 
- [Async updateTimeToLive(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateTimeToLive-property) 
- [Async waitFor(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#waitFor-property) 

#### DynamoDB DocumentClient

- [Async batchGet(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#batchGet-property)
- [Async batchWrite(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#batchWrite-property)
- [Async createSet(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#createSet-property)
- [Async delete(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#delete-property)
- [Async get(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property)
- [Async put(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property)
- [Async query(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property)
- [Async scan(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property)
- [Async update(param)](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property)

## Questions & Suggestions

Please open an issue [here](https://github.com/egg-aws/egg-dynamodb/issues).

## License

[MIT](LICENSE)
