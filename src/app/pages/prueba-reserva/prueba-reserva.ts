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
    ciudad: 'Bogotá',
    ubicacion: 'Chapinero',
    tipo: 'Apartamento',
    capacidad: 2,
    camas: 1,
    calificacion: 4.8,
    precioNoche: 180000,
    servicios: ['Wi-Fi', 'Cocina', 'Televisión'],
  };
}