import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alojamiento } from '../../../core/models/alojamiento';

// Tarjeta reutilizable de alojamiento, la misma en Inicio y en el listado.
// Es de presentación: recibe el alojamiento y solo avisa cuando piden verlo.
@Component({
  selector: 'app-alojamiento-card',
  imports: [],
  templateUrl: './alojamiento-card.html',
  styleUrl: './alojamiento-card.css',
})
export class AlojamientoCard {
  @Input({ required: true }) alojamiento!: Alojamiento;

  @Output() verDetalle = new EventEmitter<number>();

  private readonly formatoMoneda = new Intl.NumberFormat('es-CO');

  formatearPrecio(valor: number): string {
    return `$${this.formatoMoneda.format(valor)}`;
  }

  // El diseño muestra máximo tres chips, así que corto la lista.
  get serviciosPrincipales(): string[] {
    return this.alojamiento.servicios.slice(0, 3);
  }
}
