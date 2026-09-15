const { createMongooseMock } = require('./helpers/mongooseMock');

jest.mock('../src/models/Proyecto', () => {
  const { createMongooseMock } = require('./helpers/mongooseMock');
  return createMongooseMock();
});

jest.mock('../src/models/Tecnologia', () => {
  const { createMongooseMock } = require('./helpers/mongooseMock');
  return createMongooseMock();
});

const Proyecto = require('../src/models/Proyecto');
const Tecnologia = require('../src/models/Tecnologia');
const proyectoService = require('../src/services/proyectoService');

describe('proyectoService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('crearProyecto', () => {
    it('crea un proyecto correctamente cuando los datos son válidos', async () => {
      const proyectoData = {
        nombre: 'Sistema de inventario',
        descripcion: 'Aplicación web para control de inventarios',
        cliente: 'Empresa ABC',
        tecnologias: []
      };

      const guardado = { _id: '507f1f77bcf86cd799439011', ...proyectoData };

      Proyecto.prototype.save.mockResolvedValue(guardado);

      const resultado = await proyectoService.crearProyecto(proyectoData);

      expect(Proyecto.prototype.save).toHaveBeenCalledTimes(1);
      expect(resultado).toEqual(guardado);
      expect(resultado._id).toBeDefined();
      expect(resultado.nombre).toBe('Sistema de inventario');
    });

    it('lanza ValidationError si falta el nombre', async () => {
      const data = { descripcion: 'x', cliente: 'y' };

      await expect(proyectoService.crearProyecto(data)).rejects.toThrow(
        'El nombre, la descripción y el cliente son obligatorios'
      );
    });

    it('lanza ValidationError si faltan descripción o cliente', async () => {
      const data = { nombre: 'Proyecto' };

      await expect(proyectoService.crearProyecto(data)).rejects.toThrow(
        'El nombre, la descripción y el cliente son obligatorios'
      );
    });

    it('lanza ValidationError cuando tecnologias no es un arreglo', async () => {
      const data = {
        nombre: 'Proyecto',
        descripcion: 'x',
        cliente: 'y',
        tecnologias: 'no-arreglo'
      };

      await expect(proyectoService.crearProyecto(data)).rejects.toThrow(
        'Las tecnologías deben ser una lista'
      );
    });
  });

  describe('actualizarProyecto', () => {
    it('actualiza el proyecto y retorna el documento actualizado', async () => {
      const id = '507f1f77bcf86cd799439011';
      const data = { estado: 'completado' };
      const actualizado = { _id: id, ...data };

      Proyecto.findByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockResolvedValue(actualizado)
      });

      const resultado = await proyectoService.actualizarProyecto(id, data);

      expect(Proyecto.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        data,
        expect.objectContaining({ new: true, runValidators: true })
      );
      expect(resultado.estado).toBe('completado');
    });
  });

  describe('obtenerResumen', () => {
    it('retorna el resumen de proyectos desde MongoDB', async () => {
      Proyecto.countDocuments.mockResolvedValueOnce(10); // total
      Proyecto.countDocuments.mockResolvedValueOnce(4); // en progreso
      Proyecto.countDocuments.mockResolvedValueOnce(3); // completados
      Proyecto.distinct.mockResolvedValueOnce([{ _id: 'a' }, { _id: 'b' }]);

      const resumen = await proyectoService.obtenerResumen();

      expect(resumen).toEqual({
        total: 10,
        enProgreso: 4,
        completados: 3,
        tecnologiasRegistradas: 2
      });
    });
  });

  describe('verificarExiste', () => {
    it('no lanza error cuando el proyecto existe', async () => {
      Proyecto.exists.mockResolvedValue(true);

      await expect(
        proyectoService.verificarExiste('507f1f77bcf86cd799439011')
      ).resolves.toBeUndefined();
    });

    it('lanza NotFoundError cuando el proyecto no existe', async () => {
      Proyecto.exists.mockResolvedValue(false);

      await expect(
        proyectoService.verificarExiste('507f1f77bcf86cd799439011')
      ).rejects.toThrow('Proyecto no encontrado');
    });
  });
});