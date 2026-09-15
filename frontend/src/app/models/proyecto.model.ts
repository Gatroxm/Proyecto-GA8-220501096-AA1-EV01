import { Tecnologia } from './tecnologia.model';

export type EstadoProyecto =
  | 'propuesta'
  | 'en_progreso'
  | 'completado'
  | 'entregado';

export const ESTADOS_PROYECTO: EstadoProyecto[] = [
  'propuesta',
  'en_progreso',
  'completado',
  'entregado'
];

export interface Proyecto {
  _id?: string;
  nombre: string;
  descripcion: string;
  cliente: string;
  estado: EstadoProyecto;
  presupuesto?: number;
  fechaInicio?: Date;
  fechaEntrega?: Date;
  tecnologias?: Tecnologia[] | string[];
  createdAt?: Date;
  updatedAt?: Date;
}