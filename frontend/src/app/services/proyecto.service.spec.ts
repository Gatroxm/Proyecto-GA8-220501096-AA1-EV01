import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProyectoService } from './proyecto.service';
import { environment } from '../../environments/environment';
import { Proyecto } from '../models/proyecto.model';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ProyectoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('listar() hace GET y retorna los proyectos', () => {
    const proyectos: Proyecto[] = [
      {
        _id: '1',
        nombre: 'Sistema web',
        descripcion: 'Descripción',
        cliente: 'Cliente A',
        estado: 'propuesta'
      }
    ];

    service.listar().subscribe((resp) => {
      expect(resp.data).toHaveLength(1);
      expect(resp.data[0].nombre).toBe('Sistema web');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/proyectos`);
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, message: 'ok', data: proyectos });
  });

  it('crear() hace POST con el proyecto', () => {
    const nuevo: Proyecto = {
      nombre: 'App móvil',
      descripcion: 'App para pedidos',
      cliente: 'Cliente B',
      estado: 'en_progreso'
    };

    service.crear(nuevo).subscribe((resp) => {
      expect(resp.data._id).toBe('999');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/proyectos`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevo);
    req.flush({ success: true, message: 'Creado', data: { ...nuevo, _id: '999' } });
  });

  it('actualizar() hace PUT hacia /:id', () => {
    const id = '1';
    const cambios = { estado: 'completado' as const };

    service.actualizar(id, cambios).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/proyectos/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true, message: 'ok', data: {} });
  });

  it('eliminar() hace DELETE hacia /:id', () => {
    const id = '5';

    service.eliminar(id).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/proyectos/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true, message: 'Eliminado', data: null });
  });
});