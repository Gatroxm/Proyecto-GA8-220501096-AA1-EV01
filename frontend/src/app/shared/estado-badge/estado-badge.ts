import { Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { EstadoProyecto } from '../../models/proyecto.model';

@Component({
  selector: 'app-estado-badge',
  imports: [TitleCasePipe],
  styleUrl: './estado-badge.scss',
  templateUrl: './estado-badge.html'
})
export class EstadoBadge {
  estado = input<EstadoProyecto>('propuesta');
}