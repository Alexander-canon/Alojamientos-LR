import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';

// La ruta vacía es la portada. Las demás pantallas las agrego cuando estén.
export const routes: Routes = [
  { path: '', component: Inicio },
  { path: '**', redirectTo: '' },
];
