import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Proyectos } from './pages/proyectos/proyectos';
import { Tecnologias } from './pages/tecnologias/tecnologias';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'proyectos', component: Proyectos },
  { path: 'tecnologias', component: Tecnologias },
  { path: '**', redirectTo: '/dashboard' }
];