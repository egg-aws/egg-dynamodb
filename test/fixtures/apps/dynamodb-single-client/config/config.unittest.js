'use strict';

exports.dynamodb = {
  client: {
    endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
