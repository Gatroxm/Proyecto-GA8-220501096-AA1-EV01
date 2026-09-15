const asyncHandler = require('../utils/asyncHandler');
const tecnologiaService = require('../services/tecnologiaService');
const { isValidObjectId } = require('../utils/validators');

const tecnologiaController = {
  crear: asyncHandler(async (req, res) => {
    const tecnologia = await tecnologiaService.crearTecnologia(req.body);
    res.status(201).json({
      success: true,
      message: 'Tecnología creada correctamente',
      data: tecnologia
    });
  }),

  listar: asyncHandler(async (req, res) => {
    const tecnologias = await tecnologiaService.listarTecnologias();
    res.status(200).json({
      success: true,
      message: 'Tecnologías obtenidas correctamente',
      data: tecnologias
    });
  }),

  obtenerPorId: asyncHandler(async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Identificador inválido'
      });
    }

    const tecnologia = await tecnologiaService.obtenerTecnologiaPorId(
      req.params.id
    );

    if (!tecnologia) {
      return res.status(404).json({
        success: false,
        message: 'Tecnología no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tecnología obtenida correctamente',
      data: tecnologia
    });
  }),

  actualizar: asyncHandler(async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Identificador inválido'
      });
    }
    const tecnologia = await tecnologiaService.actualizarTecnologia(
      req.params.id,
      req.body
    );

    if (!tecnologia) {
      return res.status(404).json({
        success: false,
        message: 'Tecnología no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tecnología actualizada correctamente',
      data: tecnologia
    });
  }),

  eliminar: asyncHandler(async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Identificador inválido'
      });
    }
    const tecnologia = await tecnologiaService.eliminarTecnologia(
      req.params.id
    );

    if (!tecnologia) {
      return res.status(404).json({
        success: false,
        message: 'Tecnología no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tecnología eliminada correctamente'
    });
  })
};

module.exports = tecnologiaController;