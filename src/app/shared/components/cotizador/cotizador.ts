import { Component, Input } from '@angular/core';
import { Cotizacion } from '../../../core/models/cotizacion';

@Component({
  imports: [],
  selector: 'app-cotizador',
  styleUrl: './cotizador.css',
  templateUrl: './cotizador.html',
})
export class Cotizador {

  @Input() cotizacion: Cotizacion | null = null;

  private readonly formatoMoneda = new Intl.NumberFormat('es-CO');

  formatearPrecio(valor: number): string {
    return `$${this.formatoMoneda.format(valor)}`;
  }
}