const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log(`[MongoDB] Conexión exitosa a ${config.mongodbUri}`);
  } catch (error) {
    console.error('[MongoDB] Error de conexión:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;