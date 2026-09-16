const errorHandler = require('../src/middlewares/errorHandler');
const notFound = require('../src/middlewares/notFound');

describe('errorHandler', () => {
  let req;
  let res;
  let jsonMock;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    res = { status: jest.fn(() => ({ json: jsonMock })) };
  });

  it('responde 500 con mensaje por defecto cuando no hay statusCode', () => {
    errorHandler(new Error('boom'), req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'boom'
    });
  });

  it('respeta el statusCode y message de un error concreto', () => {
    const err = new Error('Registro no encontrado');
    err.statusCode = 404;

    errorHandler(err, req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Registro no encontrado'
    });
  });

  it('mapea CastError de ObjectId a 400 con mensaje claro', () => {
    const err = new Error('bad');
    err.name = 'CastError';
    err.kind = 'ObjectId';

    errorHandler(err, req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Identificador inválido'
    });
  });

  it('mapea ValidationError de Mongoose a 400 con el primer mensaje', () => {
    const err = new Error('Proyecto validation failed');
    err.name = 'ValidationError';
    err.errors = {
      nombre: { message: 'El nombre del proyecto es requerido' }
    };

    errorHandler(err, req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'El nombre del proyecto es requerido'
    });
  });

  it('mapea código 11000 a 409 duplicado', () => {
    const err = new Error('duplicate');
    err.code = 11000;

    errorHandler(err, req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Registro duplicado'
    });
  });
});

describe('notFound', () => {
  it('responde 404 para rutas inexistentes', () => {
    const req = { originalUrl: '/api/ruta-inventada' };
    const jsonMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: jsonMock })) };

    notFound(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: 'Ruta no encontrada: /api/ruta-inventada'
    });
  });
});