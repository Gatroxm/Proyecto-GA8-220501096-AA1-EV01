const app = require('./app');
const config = require('./config/config');

const startServer = () => {
  app.listen(config.port, () => {
    console.log(`[Server] GatroxM.dev API corriendo en http://localhost:${config.port}`);
    console.log(`[Server] Entorno: ${config.nodeEnv}`);
  });
};

startServer();

module.exports = startServer;