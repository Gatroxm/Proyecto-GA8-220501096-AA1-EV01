import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Proyecto } from '../models/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = `${environment.apiUrl}/proyectos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<ApiResponse<Proyecto[]>> {
    return this.http.get<ApiResponse<Proyecto[]>>(this.apiUrl);
  }

  obtenerPorId(id: string): Observable<ApiResponse<Proyecto>> {
    return this.http.get<ApiResponse<Proyecto>>(`${this.apiUrl}/${id}`);
  }

  crear(proyecto: Proyecto): Observable<ApiResponse<Proyecto>> {
    return this.http.post<ApiResponse<Proyecto>>(this.apiUrl, proyecto);
  }

  actualizar(id: string, proyecto: Partial<Proyecto>): Observable<ApiResponse<Proyecto>> {
    return this.http.put<ApiResponse<Proyecto>>(`${this.apiUrl}/${id}`, proyecto);
  }

  eliminar(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
  }

  obtenerResumen(): Observable<ApiResponse<{ total: number; enProgreso: number; completados: number; tecnologiasRegistradas: number }>> {
    return this.http.get<ApiResponse<{ total: number; enProgreso: number; completados: number; tecnologiasRegistradas: number }>>(`${this.apiUrl}/resumen`);
  }
}