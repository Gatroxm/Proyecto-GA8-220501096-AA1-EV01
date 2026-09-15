const mongoose = require('mongoose');

const ESTADOS = ['propuesta', 'en_progreso', 'completado', 'entregado'];

const proyectoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del proyecto es requerido'],
      trim: true,
      maxlength: [150, 'El nombre no puede superar 150 caracteres']
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción del proyecto es requerida'],
      trim: true,
      maxlength: [1000, 'La descripción no puede superar 1000 caracteres']
    },
    cliente: {
      type: String,
      required: [true, 'El cliente es requerido'],
      trim: true,
      maxlength: [150, 'El nombre del cliente no puede superar 150 caracteres']
    },
    estado: {
      type: String,
      enum: {
        values: ESTADOS,
        message: '{VALUE} no es un estado válido'
      },
      default: 'propuesta'
    },
    presupuesto: {
      type: Number,
      min: [0, 'El presupuesto no puede ser negativo']
    },
    fechaInicio: {
      type: Date
    },
    fechaEntrega: {
      type: Date
    },
    tecnologias: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tecnologia'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('Proyecto', proyectoSchema);
module.exports.ESTADOS = ESTADOS;