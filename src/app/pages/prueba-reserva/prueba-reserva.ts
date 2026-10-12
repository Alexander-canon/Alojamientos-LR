import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormReserva } from '../../shared/components/form-reserva/form-reserva';
import { Alojamiento } from '../../core/models/alojamiento';

// Pagina temporal para probar el flujo de reserva mientras el detalle no existe.
@Component({
  selector: 'app-prueba-reserva',
  imports: [RouterLink, FormReserva],
  templateUrl: './prueba-reserva.html',
  styleUrl: './prueba-reserva.css',
})
export class PruebaReserva {
  protected readonly alojamiento: Alojamiento = {
    id: 1,
    nombre: 'Loft moderno en Chapinero',
    descripcion: 'Loft de prueba para revisar el formulario de reserva.',
    ciudad: 'Bogotá',
    ubicacion: 'Chapinero',
    tipo: 'Apartamento',
    capacidad: 2,
    habitaciones: 1,
    camas: 1,
    banos: 1,
    calificacion: 4.8,
    activo: true,
    imagenPrincipal: 'assets/images/loft-bogota.jpg',
    imagenes: ['assets/images/loft-bogota.jpg'],
    precioNoche: 180000,
    tarifaLimpieza: 45000,
    servicios: ['Wi-Fi', 'Cocina', 'Televisión'],
    reglas: ['No fumar'],
  };
}