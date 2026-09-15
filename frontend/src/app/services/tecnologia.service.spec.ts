import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TecnologiaService } from './tecnologia.service';
import { environment } from '../../environments/environment';
import { Tecnologia } from '../models/tecnologia.model';

describe('TecnologiaService', () => {
  let service: TecnologiaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TecnologiaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('listar() hace GET y retorna las tecnologías', () => {
    const tecnologias: Tecnologia[] = [
      { _id: '1', nombre: 'Angular', categoria: 'Frontend' }
    ];

    service.listar().subscribe((resp) => {
      expect(resp.data).toHaveLength(1);
      expect(resp.data[0].nombre).toBe('Angular');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tecnologias`);
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, message: 'ok', data: tecnologias });
  });

  it('crear() hace POST con la tecnología', () => {
    const nueva: Tecnologia = {
      nombre: 'Node.js',
      categoria: 'Backend',
      version: '20'
    };

    service.crear(nueva).subscribe((resp) => {
      expect(resp.data._id).toBe('42');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tecnologias`);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true, message: 'Creado', data: { ...nueva, _id: '42' } });
  });
});