import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto.model';
import { Tecnologia } from '../../models/tecnologia.model';
import { EstadoBadge } from '../../shared/estado-badge/estado-badge';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, EstadoBadge],
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  resumen = { total: 0, enProgreso: 0, completados: 0, tecnologiasRegistradas: 0 };
  proyectosRecientes: Proyecto[] = [];
  cargando = true;
  error = '';

  constructor(
    private proyectoService: ProyectoService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard(): void {
    this.cargando = true;
    this.error = '';
    this.proyectoService.obtenerResumen().subscribe({
      next: (resp) => {
        this.resumen = resp.data;
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
        this.proyectosRecientes = resp.data.slice(0, 5);
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.proyectosRecientes = [];
        this.changeDetectorRef.markForCheck();
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