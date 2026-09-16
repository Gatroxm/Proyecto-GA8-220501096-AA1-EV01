require('dotenv').config();

const nodeEnv = process.env.NODE_ENV || 'development';

const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/gatroxm',
  nodeEnv,
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : nodeEnv === 'production'
      ? ['https://gatroxm.dev']
      : ['http://localhost:4200', 'http://127.0.0.1:4200']
};

module.exports = config;