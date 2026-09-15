import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoService } from '../../services/proyecto.service';
import { TecnologiaService } from '../../services/tecnologia.service';
import { Proyecto } from '../../models/proyecto.model';
import { Tecnologia } from '../../models/tecnologia.model';
import { EstadoBadge } from '../../shared/estado-badge/estado-badge';
import { Alert } from '../../shared/alert/alert';
import { ProyectoForm } from '../../shared/proyecto-form/proyecto-form';

@Component({
  selector: 'app-proyectos',
  imports: [CommonModule, EstadoBadge, Alert, ProyectoForm],
  styleUrl: './proyectos.scss',
  templateUrl: './proyectos.html'
})
export class Proyectos implements OnInit {
  proyectos: Proyecto[] = [];
  tecnologias: Tecnologia[] = [];
  cargando = true;
  error = '';
  mensajeExito = '';
  mostrarFormulario = false;
  proyectoEnEdicion: Proyecto | null = null;

  constructor(
    private proyectoService: ProyectoService,
    private tecnologiaService: TecnologiaService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.error = '';
    this.proyectoService.listar().subscribe({
      next: (resp) => {
        this.proyectos = resp.data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No fue posible obtener la información.';
        this.cargando = false;
      }
    });
    this.cargarTecnologias();
  }

  cargarTecnologias(): void {
    this.tecnologiaService.listar().subscribe({
      next: (resp) => {
        this.tecnologias = resp.data;
      },
      error: () => {
        this.tecnologias = [];
      }
    });
  }

  abrirCrear(): void {
    this.proyectoEnEdicion = null;
    this.mostrarFormulario = true;
    this.mensajeExito = '';
    this.error = '';
  }

  abrirEditar(proyecto: Proyecto): void {
    this.proyectoEnEdicion = proyecto;
    this.mostrarFormulario = true;
    this.mensajeExito = '';
    this.error = '';
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
    this.proyectoEnEdicion = null;
  }

  guardarProyecto(proyecto: Proyecto): void {
    this.error = '';
    if (proyecto._id) {
      this.proyectoService.actualizar(proyecto._id, proyecto).subscribe({
        next: () => {
          this.mensajeExito = 'Registro actualizado correctamente.';
          this.mostrarFormulario = false;
          this.proyectoEnEdicion = null;
          this.cargarDatos();
        },
        error: () => {
          this.error = 'No fue posible actualizar el proyecto.';
        }
      });
    } else {
      this.proyectoService.crear(proyecto).subscribe({
        next: () => {
          this.mensajeExito = 'Registro creado correctamente.';
          this.mostrarFormulario = false;
          this.cargarDatos();
        },
        error: () => {
          this.error = 'No fue posible crear el proyecto.';
        }
      });
    }
  }

  eliminarProyecto(proyecto: Proyecto): void {
    if (!proyecto._id) {
      return;
    }
    if (!confirm(`¿Eliminar el proyecto "${proyecto.nombre}"?`)) {
      return;
    }
    this.proyectoService.eliminar(proyecto._id).subscribe({
      next: () => {
        this.mensajeExito = 'Registro eliminado correctamente.';
        this.cargarDatos();
      },
      error: () => {
        this.error = 'No fue posible eliminar el proyecto.';
      }
    });
  }

  nombreTecnologias(proyecto: Proyecto): string {
    const tecs = proyecto.tecnologias ?? [];
    if (tecs.length === 0) {
      return '—';
    }
    return tecs
      .map((t) => (typeof t === 'string' ? t : (t as Tecnologia).nombre))
      .join(', ');
  }
}