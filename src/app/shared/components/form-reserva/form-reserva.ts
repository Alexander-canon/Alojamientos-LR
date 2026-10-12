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

  // Paso 1: fechas y huéspedes. Paso 2: revisar la cotización y confirmar.
  paso: 1 | 2 = 1;

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
      this.alojamiento.tarifaLimpieza,
      this.fechaEntrada,
      this.fechaSalida
    );
  }

  // Solo pasa al paso 2 una estancia que cumpla las reglas de negocio; de ahí
  // que al reservar ya exista una cotización válida generada antes.
  continuar() {
    this.errores = this.validarEstancia();
    if (this.errores.length > 0) return;
    this.paso = 2;
  }

  volver() {
    this.errores = [];
    this.paso = 1;
  }

  onReservar() {
    this.mensajeExito = '';
    if (this.paso !== 2 || !this.cotizacion) return;

    const datos = {
      alojamientoId: this.alojamiento.id,
      alojamientoNombre: this.alojamiento.nombre,
      ciudad: this.alojamiento.ciudad,
      precioNoche: this.alojamiento.precioNoche,
      tarifaLimpieza: this.alojamiento.tarifaLimpieza,
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

  // Reglas que se revisan antes de mostrar la cotización.
  private validarEstancia(): string[] {
    const errores: string[] = [];
    if (!this.fechaEntrada || !this.fechaSalida) {
      errores.push('Elige la fecha de entrada y la de salida.');
    } else {
      if (this.fechaEntrada < this.hoy) {
        errores.push('La fecha de entrada no puede ser anterior a hoy.');
      }
      const noches = this.reservaService.calcularNoches(this.fechaEntrada, this.fechaSalida);
      if (noches < 1) {
        errores.push('La fecha de salida debe ser posterior a la de entrada.');
      }
    }
    const hue = Number(this.huespedes);
    if (!Number.isInteger(hue) || hue < 1) {
      errores.push('Debe haber al menos 1 huésped.');
    } else if (hue > this.alojamiento.capacidad) {
      errores.push(`Este alojamiento admite máximo ${this.alojamiento.capacidad} huéspedes.`);
    }
    return errores;
  }

  private limpiar() {
    this.paso = 1;
    this.fechaEntrada = '';
    this.fechaSalida = '';
    this.huespedes = 1;
    this.nombreHuesped = '';
    this.correo = '';
    this.cotizacion = null;
  }

  // Las fechas se guardan en formato ISO (aaaa-mm-dd) y acá se leen en español.
  formatearFecha(iso: string): string {
    const [anno, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${anno}`;
  }
}