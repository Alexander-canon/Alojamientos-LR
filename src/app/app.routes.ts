import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { MisReservas } from './pages/mis-reservas/mis-reservas';
import { PruebaReserva } from './pages/prueba-reserva/prueba-reserva';
import { Alojamientos } from './pages/alojamientos/alojamientos';

// La ruta vacía es la portada. El detalle llega más adelante: /alojamientos/:id.
export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'alojamientos', component: Alojamientos },
  { path: 'mis-reservas', component: MisReservas },
  { path: 'prueba-reserva', component: PruebaReserva },
  { path: '**', redirectTo: '' },
];