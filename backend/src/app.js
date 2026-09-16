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

const isAllowedOrigin = (origin) => {
  if (!origin || config.corsOrigin.includes(origin)) {
    return true;
  }

  return (
    config.nodeEnv !== 'production' &&
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
  );
};

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, isAllowedOrigin(origin));
    }
  })
);
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