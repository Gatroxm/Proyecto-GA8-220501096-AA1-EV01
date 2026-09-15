import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tecnologia } from '../../models/tecnologia.model';

@Component({
  selector: 'app-tecnologia-form',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrl: './tecnologia-form.scss',
  templateUrl: './tecnologia-form.html'
})
export class TecnologiaForm implements OnChanges {
  @Input() tecnologia: Tecnologia | null = null;
  @Output() guardar = new EventEmitter<Tecnologia>();
  @Output() cancelar = new EventEmitter<void>();

  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      categoria: ['', [Validators.required, Validators.maxLength(100)]],
      version: ['', [Validators.maxLength(50)]],
      descripcion: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tecnologia'] && this.tecnologia) {
      this.formulario.patchValue({
        nombre: this.tecnologia.nombre,
        categoria: this.tecnologia.categoria,
        version: this.tecnologia.version ?? '',
        descripcion: this.tecnologia.descripcion ?? ''
      });
    }
  }

  guardarTecnologia(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valor = this.formulario.value;
    const tecnologia: Tecnologia = {
      _id: this.tecnologia?._id,
      nombre: valor.nombre,
      categoria: valor.categoria,
      version: valor.version || undefined,
      descripcion: valor.descripcion || undefined
    };

    this.guardar.emit(tecnologia);
  }
}