const Proyecto = require('../models/Proyecto');
const tecnologiaService = require('./tecnologiaService');
const { NotFoundError, ValidationError } = tecnologiaService;

const services = {
  async crearProyecto(data) {
    if (!data.nombre || !data.descripcion || !data.cliente) {
      throw new ValidationError(
        'El nombre, la descripción y el cliente son obligatorios'
      );
    }

    const tecnologias = data.tecnologias || [];
    if (!Array.isArray(tecnologias)) {
      throw new ValidationError('Las tecnologías deben ser una lista');
    }

    if (tecnologias.length > 0) {
      for (const id of tecnologias) {
        await tecnologiaService.verificarExiste(id);
      }
    }

    const proyecto = new Proyecto({
      ...data,
      tecnologias
    });

    return proyecto.save();
  },

  listarProyectos() {
    return Proyecto.find().populate('tecnologias').sort({ createdAt: -1 });
  },

  async obtenerProyectoPorId(id) {
    return Proyecto.findById(id).populate('tecnologias');
  },

  async actualizarProyecto(id, data) {
    const tecnologias = data.tecnologias || [];

    if (!Array.isArray(tecnologias)) {
      throw new ValidationError('Las tecnologías deben ser una lista');
    }

    if (tecnologias.length > 0) {
      for (const tid of tecnologias) {
        await tecnologiaService.verificarExiste(tid);
      }
    }

    return Proyecto.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).populate('tecnologias');
  },

  eliminarProyecto(id) {
    return Proyecto.findByIdAndDelete(id);
  },

  async obtenerResumen() {
    const total = await Proyecto.countDocuments();
    const enProgreso = await Proyecto.countDocuments({ estado: 'en_progreso' });
    const completados = await Proyecto.countDocuments({
      estado: { $in: ['completado', 'entregado'] }
    });
    const techCount = await Proyecto.distinct('tecnologias');
    return {
      total,
      enProgreso,
      completados,
      tecnologiasRegistradas: techCount.length
    };
  },

  async verificarExiste(id) {
    const existe = await Proyecto.exists({ _id: id });
    if (!existe) {
      throw new NotFoundError('Proyecto no encontrado');
    }
  }
};

module.exports = services;