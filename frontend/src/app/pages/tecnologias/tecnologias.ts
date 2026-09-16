import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TecnologiaService } from '../../services/tecnologia.service';
import { ProyectoService } from '../../services/proyecto.service';
import { Tecnologia } from '../../models/tecnologia.model';
import { Proyecto } from '../../models/proyecto.model';
import { Alert } from '../../shared/alert/alert';
import { TecnologiaForm } from '../../shared/tecnologia-form/tecnologia-form';

@Component({
  selector: 'app-tecnologias',
  imports: [CommonModule, Alert, TecnologiaForm],
  styleUrl: './tecnologias.scss',
  templateUrl: './tecnologias.html'
})
export class Tecnologias implements OnInit {
  tecnologias: Tecnologia[] = [];
  proyectos: Proyecto[] = [];
  cargando = true;
  error = '';
  mensajeExito = '';
  mostrarFormulario = false;
  tecnologiaEnEdicion: Tecnologia | null = null;

  constructor(
    private tecnologiaService: TecnologiaService,
    private proyectoService: ProyectoService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.error = '';
    this.tecnologiaService.listar().subscribe({
      next: (resp) => {
        this.tecnologias = resp.data;
        this.cargando = false;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.error = 'No fue posible obtener la información.';
        this.cargando = false;
        this.changeDetectorRef.markForCheck();
      }
    });
    this.proyectoService.listar().subscribe({
      next: (resp) => {
        this.proyectos = resp.data;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.proyectos = [];
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  abrirCrear(): void {
    this.tecnologiaEnEdicion = null;
    this.mostrarFormulario = true;
    this.mensajeExito = '';
    this.error = '';
  }

  abrirEditar(tecnologia: Tecnologia): void {
    this.tecnologiaEnEdicion = tecnologia;
    this.mostrarFormulario = true;
    this.mensajeExito = '';
    this.error = '';
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
    this.tecnologiaEnEdicion = null;
  }

  guardarTecnologia(tecnologia: Tecnologia): void {
    this.error = '';
    if (tecnologia._id) {
      this.tecnologiaService.actualizar(tecnologia._id, tecnologia).subscribe({
        next: () => {
          this.mensajeExito = 'Registro actualizado correctamente.';
          this.cancelarFormulario();
          this.cargarDatos();
          this.changeDetectorRef.markForCheck();
        },
        error: () => {
          this.error = 'No fue posible actualizar la tecnología.';
        }
      });
    } else {
      this.tecnologiaService.crear(tecnologia).subscribe({
        next: () => {
          this.mensajeExito = 'Registro creado correctamente.';
          this.cancelarFormulario();
          this.cargarDatos();
          this.changeDetectorRef.markForCheck();
        },
        error: () => {
          this.error = 'No fue posible crear la tecnología.';
        }
      });
    }
  }

  eliminarTecnologia(tecnologia: Tecnologia): void {
    if (!tecnologia._id) {
      return;
    }
    if (!confirm(`¿Eliminar la tecnología "${tecnologia.nombre}"?`)) {
      return;
    }
    this.tecnologiaService.eliminar(tecnologia._id).subscribe({
      next: () => {
        this.mensajeExito = 'Registro eliminado correctamente.';
        this.cargarDatos();
      },
      error: () => {
        this.error = 'No fue posible eliminar la tecnología.';
      }
    });
  }

  conteoProyectos(idTecnologia: string): number {
    return this.proyectos.filter((p) =>
      (p.tecnologias ?? []).some((t) => (typeof t === 'string' ? t === idTecnologia : (t as Tecnologia)._id === idTecnologia))
    ).length;
  }
}