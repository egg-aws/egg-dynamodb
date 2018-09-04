'use strict';

exports.dynamodb = {
  clients: {
    dynamodb1: {
      endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    dynamodb2: {
      endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  },
};
