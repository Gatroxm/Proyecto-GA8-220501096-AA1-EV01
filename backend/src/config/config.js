require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/gatroxm',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin:
    process.env.NODE_ENV === 'production'
      ? process.env.CORS_ORIGIN || 'https://gatroxm.dev'
      : 'http://localhost:4200'
};

module.exports = config;