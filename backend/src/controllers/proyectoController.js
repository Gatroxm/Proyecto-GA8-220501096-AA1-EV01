const asyncHandler = require('../utils/asyncHandler');
const proyectoService = require('../services/proyectoService');
const { isValidObjectId } = require('../utils/validators');

const proyectoController = {
  crear: asyncHandler(async (req, res) => {
    const proyecto = await proyectoService.crearProyecto(req.body);
    res.status(201).json({
      success: true,
      message: 'Proyecto creado correctamente',
      data: proyecto
    });
  }),

  listar: asyncHandler(async (req, res) => {
    const proyectos = await proyectoService.listarProyectos();
    res.status(200).json({
      success: true,
      message: 'Proyectos obtenidos correctamente',
      data: proyectos
    });
  }),

  obtenerPorId: asyncHandler(async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Identificador inválido'
      });
    }

    const proyecto = await proyectoService.obtenerProyectoPorId(req.params.id);

    if (!proyecto) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Proyecto obtenido correctamente',
      data: proyecto
    });
  }),

  actualizar: asyncHandler(async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Identificador inválido'
      });
    }
    const proyecto = await proyectoService.actualizarProyecto(
      req.params.id,
      req.body
    );

    if (!proyecto) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Proyecto actualizado correctamente',
      data: proyecto
    });
  }),

  eliminar: asyncHandler(async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Identificador inválido'
      });
    }
    const proyecto = await proyectoService.eliminarProyecto(req.params.id);

    if (!proyecto) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Proyecto eliminado correctamente'
    });
  }),

  resumen: asyncHandler(async (req, res) => {
    const resumen = await proyectoService.obtenerResumen();
    res.status(200).json({
      success: true,
      message: 'Resumen obtenido correctamente',
      data: resumen
    });
  })
};

module.exports = proyectoController;