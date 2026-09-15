const { createMongooseMock } = require('./helpers/mongooseMock');

jest.mock('../src/models/Tecnologia', () => {
  const { createMongooseMock } = require('./helpers/mongooseMock');
  return createMongooseMock();
});

const Tecnologia = require('../src/models/Tecnologia');
const tecnologiaService = require('../src/services/tecnologiaService');

describe('tecnologiaService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('crearTecnologia', () => {
    it('crea una tecnología con datos válidos', async () => {
      const data = { nombre: 'Angular', categoria: 'Frontend' };
      const creada = { _id: '507f1f77bcf86cd799439011', ...data };

      Tecnologia.create.mockResolvedValue(creada);

      const resultado = await tecnologiaService.crearTecnologia(data);

      expect(Tecnologia.create).toHaveBeenCalledWith(data);
      expect(resultado.nombre).toBe('Angular');
    });

    it('lanza ValidationError sin nombre ni categoría', () => {
      expect(() => tecnologiaService.crearTecnologia({})).toThrow(
        'El nombre y la categoría son obligatorios'
      );
    });

    it('lanza ValidationError cuando solo falta la categoría', () => {
      expect(() =>
        tecnologiaService.crearTecnologia({ nombre: 'Node.js' })
      ).toThrow('El nombre y la categoría son obligatorios');
    });
  });

  describe('listarTecnologias', () => {
    it('retorna la lista de tecnologías', async () => {
      const listado = [
        { _id: '1', nombre: 'Express' },
        { _id: '2', nombre: 'MongoDB' }
      ];

      Tecnologia.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(listado)
      });

      const resultado = await tecnologiaService.listarTecnologias();

      expect(Tecnologia.find).toHaveBeenCalled();
      expect(resultado).toHaveLength(2);
    });
  });

  describe('verificarExiste', () => {
    it('no lanza error cuando la tecnología existe', async () => {
      Tecnologia.exists.mockResolvedValue(true);

      await expect(
        tecnologiaService.verificarExiste('507f1f77bcf86cd799439011')
      ).resolves.toBeUndefined();
    });

    it('lanza NotFoundError cuando la tecnología no existe', async () => {
      Tecnologia.exists.mockResolvedValue(false);

      await expect(
        tecnologiaService.verificarExiste('507f1f77bcf86cd799439011')
      ).rejects.toThrow('Tecnología no encontrada');
    });
  });

  describe('eliminarTecnologia', () => {
    it('elimina una tecnología existente', async () => {
      Tecnologia.findByIdAndDelete.mockResolvedValue({ _id: '123' });

      const resultado =
        await tecnologiaService.eliminarTecnologia('123');

      expect(Tecnologia.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(resultado._id).toBe('123');
    });
  });
});