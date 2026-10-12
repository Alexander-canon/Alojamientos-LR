import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservaService } from '../../core/services/reserva.service';
import { Reserva } from '../../core/models/reserva';

@Component({
  imports: [RouterLink],
  selector: 'app-mis-reservas',
  styleUrl: './mis-reservas.css',
  templateUrl: './mis-reservas.html',
})
export class MisReservas implements OnInit {

  reservas: Reserva[] = [];

  private readonly formatoMoneda = new Intl.NumberFormat('es-CO');

  constructor(private reservaService: ReservaService) {}

  ngOnInit() {
    this.cargarReservas();
  }

  cargarReservas() {
    this.reservas = this.reservaService.obtenerReservas();
  }

  formatearPrecio(valor: number): string {
    return `$${this.formatoMoneda.format(valor)}`;
  }

  onCancelar(id: string) {
    if (confirm('¿Seguro que quieres cancelar esta reserva?')) {
      this.reservaService.cancelarReserva(id);
      this.cargarReservas();
    }
  }
}