const Tecnologia = require('../models/Tecnologia');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

const services = {
  crearTecnologia(data) {
    if (!data.nombre || !data.categoria) {
      throw new ValidationError('El nombre y la categoría son obligatorios');
    }
    return Tecnologia.create(data);
  },

  listarTecnologias() {
    return Tecnologia.find().sort({ createdAt: -1 });
  },

  obtenerTecnologiaPorId(id) {
    return Tecnologia.findById(id);
  },

  actualizarTecnologia(id, data) {
    return Tecnologia.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  },

  eliminarTecnologia(id) {
    return Tecnologia.findByIdAndDelete(id);
  },

  async verificarExiste(id) {
    const existe = await Tecnologia.exists({ _id: id });
    if (!existe) {
      throw new NotFoundError('Tecnología no encontrada');
    }
  }
};

module.exports = services;
module.exports.NotFoundError = NotFoundError;
module.exports.ValidationError = ValidationError;