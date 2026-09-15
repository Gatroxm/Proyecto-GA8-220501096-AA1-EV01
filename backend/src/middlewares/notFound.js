const asyncHandler = require('../utils/asyncHandler');

const metodoInexistente = (req, res) => {
  res.status(405).json({
    success: false,
    message: `Método ${req.method} no permitido para ${req.originalUrl}`
  });
};

module.exports = asyncHandler(metodoInexistente);