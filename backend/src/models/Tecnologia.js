const mongoose = require('mongoose');

const tecnologiaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la tecnología es requerido'],
      trim: true,
      maxlength: [100, 'El nombre no puede superar 100 caracteres']
    },
    categoria: {
      type: String,
      required: [true, 'La categoría es requerida'],
      trim: true,
      maxlength: [100, 'La categoría no puede superar 100 caracteres']
    },
    version: {
      type: String,
      trim: true,
      maxlength: [50, 'La versión no puede superar 50 caracteres']
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [500, 'La descripción no puede superar 500 caracteres']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('Tecnologia', tecnologiaSchema);