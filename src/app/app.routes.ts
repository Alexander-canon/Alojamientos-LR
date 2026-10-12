import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { MisReservas } from './pages/mis-reservas/mis-reservas';
import { Alojamientos } from './pages/alojamientos/alojamientos';
import { DetalleAlojamiento } from './pages/detalle-alojamiento/detalle-alojamiento';

// La ruta vacía es la portada. El detalle espera el id en la URL.
export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'alojamientos', component: Alojamientos },
  { path: 'alojamientos/:id', component: DetalleAlojamiento },
  { path: 'mis-reservas', component: MisReservas },
  { path: '**', redirectTo: '' },
];