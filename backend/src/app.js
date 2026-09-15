const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const connectDB = require('./config/db');
const proyectoRoutes = require('./routes/proyectoRoutes');
const tecnologiaRoutes = require('./routes/tecnologiaRoutes');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const app = express();

connectDB();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bienvenido a la API de GatroxM.dev',
    endpoints: {
      proyectos: '/api/proyectos',
      tecnologias: '/api/tecnologias'
    }
  });
});

app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tecnologias', tecnologiaRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;