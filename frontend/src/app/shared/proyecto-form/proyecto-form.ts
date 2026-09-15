import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Proyecto, ESTADOS_PROYECTO } from '../../models/proyecto.model';
import { Tecnologia } from '../../models/tecnologia.model';

@Component({
  selector: 'app-proyecto-form',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrl: './proyecto-form.scss',
  templateUrl: './proyecto-form.html'
})
export class ProyectoForm implements OnChanges {
  @Input() proyecto: Proyecto | null = null;
  @Input() tecnologias: Tecnologia[] = [];
  @Output() guardar = new EventEmitter<Proyecto>();
  @Output() cancelar = new EventEmitter<void>();

  estados = ESTADOS_PROYECTO;
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
      cliente: ['', [Validators.required, Validators.maxLength(150)]],
      estado: ['propuesta', [Validators.required]],
      presupuesto: [0, [Validators.min(0)]],
      fechaInicio: [''],
      fechaEntrega: [''],
      tecnologias: [[]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['proyecto'] && this.proyecto) {
      const tecIds = (this.proyecto.tecnologias ?? [])
        .map((t) => (typeof t === 'string' ? t : (t as Tecnologia)._id))
        .filter(Boolean);
      this.formulario.patchValue({
        nombre: this.proyecto.nombre,
        descripcion: this.proyecto.descripcion,
        cliente: this.proyecto.cliente,
        estado: this.proyecto.estado,
        presupuesto: this.proyecto.presupuesto ?? 0,
        fechaInicio: this.proyecto.fechaInicio ? this.isoFecha(this.proyecto.fechaInicio) : '',
        fechaEntrega: this.proyecto.fechaEntrega ? this.isoFecha(this.proyecto.fechaEntrega) : '',
        tecnologias: tecIds
      });
    }
  }

  private isoFecha(fecha: Date | string): string {
    return new Date(fecha).toISOString().slice(0, 10);
  }

  guardarProyecto(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valor = this.formulario.value;
    const proyecto: Proyecto = {
      _id: this.proyecto?._id,
      nombre: valor.nombre,
      descripcion: valor.descripcion,
      cliente: valor.cliente,
      estado: valor.estado,
      presupuesto: valor.presupuesto,
      fechaInicio: valor.fechaInicio ? new Date(valor.fechaInicio) : undefined,
      fechaEntrega: valor.fechaEntrega ? new Date(valor.fechaEntrega) : undefined,
      tecnologias: valor.tecnologias
    };

    this.guardar.emit(proyecto);
  }

  toggleTecnologia(id: string | undefined): void {
    if (!id) {
      return;
    }
    const seleccionadas = this.formulario.get('tecnologias')?.value as string[];
    const index = seleccionadas.indexOf(id);
    if (index >= 0) {
      seleccionadas.splice(index, 1);
    } else {
      seleccionadas.push(id);
    }
    this.formulario.get('tecnologias')?.setValue([...seleccionadas]);
  }

  estaSeleccionada(id: string | undefined): boolean {
    if (!id) {
      return false;
    }
    return (this.formulario.get('tecnologias')?.value as string[]).includes(id);
  }
}