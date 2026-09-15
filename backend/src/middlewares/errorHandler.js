const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Error interno del servidor';

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = 'Identificador inválido';
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    const firstError = Object.values(err.errors)[0];
    message = firstError ? firstError.message : 'Datos inválidos';
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Registro duplicado';
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;