import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cotizador } from '../cotizador/cotizador';
import { ReservaService } from '../../../core/services/reserva.service';
import { Alojamiento } from '../../../core/models/alojamiento';
import { Cotizacion } from '../../../core/models/cotizacion';
import { Reserva } from '../../../core/models/reserva';

@Component({
  imports: [FormsModule, Cotizador],
  selector: 'app-form-reserva',
  styleUrl: './form-reserva.css',
  templateUrl: './form-reserva.html',
})
export class FormReserva {

  @Input() alojamiento!: Alojamiento;
  @Output() reservaCreada = new EventEmitter<Reserva>();

  fechaEntrada: string = '';
  fechaSalida: string = '';
  huespedes: number = 1;
  nombreHuesped: string = '';
  correo: string = '';

  cotizacion: Cotizacion | null = null;
  errores: string[] = [];
  mensajeExito: string = '';

  constructor(private reservaService: ReservaService) {}

  get hoy(): string {
    return this.reservaService.hoy();
  }

  onFechaEntrada(valor: string) {
    this.fechaEntrada = valor;
    this.actualizarCotizacion();
  }

  onFechaSalida(valor: string) {
    this.fechaSalida = valor;
    this.actualizarCotizacion();
  }

  actualizarCotizacion() {
    this.cotizacion = this.reservaService.cotizar(
      this.alojamiento.precioNoche,
      this.fechaEntrada,
      this.fechaSalida
    );
  }

  onReservar() {
    this.mensajeExito = '';

    const datos = {
      alojamientoId: this.alojamiento.id,
      alojamientoNombre: this.alojamiento.nombre,
      precioNoche: this.alojamiento.precioNoche,
      capacidad: this.alojamiento.capacidad,
      fechaEntrada: this.fechaEntrada,
      fechaSalida: this.fechaSalida,
      huespedes: Number(this.huespedes),
      nombreHuesped: this.nombreHuesped,
      correo: this.correo,
    };

    this.errores = this.reservaService.validar(datos);
    if (this.errores.length > 0) return;

    const reserva = this.reservaService.crearReserva(datos);
    if (reserva) {
      this.mensajeExito = 'Tu reserva quedó confirmada. Puedes verla en Mis reservas.';
      this.reservaCreada.emit(reserva);
      this.limpiar();
    }
  }

  private limpiar() {
    this.fechaEntrada = '';
    this.fechaSalida = '';
    this.huespedes = 1;
    this.nombreHuesped = '';
    this.correo = '';
    this.cotizacion = null;
  }
}