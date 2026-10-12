import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { MisReservas } from './pages/mis-reservas/mis-reservas';
import { PruebaReserva } from './pages/prueba-reserva/prueba-reserva';

// La ruta vacía es la portada. Las demás pantallas las agrego cuando estén.
export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'mis-reservas', component: MisReservas },
  { path: 'prueba-reserva', component: PruebaReserva },
  { path: '**', redirectTo: '' },
];
