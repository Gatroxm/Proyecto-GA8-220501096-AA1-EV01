import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Tecnologia } from '../models/tecnologia.model';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {
  private apiUrl = `${environment.apiUrl}/tecnologias`;

  constructor(private http: HttpClient) {}

  listar(): Observable<ApiResponse<Tecnologia[]>> {
    return this.http.get<ApiResponse<Tecnologia[]>>(this.apiUrl);
  }

  obtenerPorId(id: string): Observable<ApiResponse<Tecnologia>> {
    return this.http.get<ApiResponse<Tecnologia>>(`${this.apiUrl}/${id}`);
  }

  crear(tecnologia: Tecnologia): Observable<ApiResponse<Tecnologia>> {
    return this.http.post<ApiResponse<Tecnologia>>(this.apiUrl, tecnologia);
  }

  actualizar(id: string, tecnologia: Partial<Tecnologia>): Observable<ApiResponse<Tecnologia>> {
    return this.http.put<ApiResponse<Tecnologia>>(`${this.apiUrl}/${id}`, tecnologia);
  }

  eliminar(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
  }
}