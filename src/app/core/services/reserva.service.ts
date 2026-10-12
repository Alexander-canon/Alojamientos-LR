import { Injectable } from '@angular/core';
import { Cotizacion } from '../models/cotizacion';
import { DatosReserva, Reserva } from '../models/reserva';

// Reglas de negocio: se cambian aqui y se documentan en el README
const MIN_NOCHES = 1;
const MAX_NOCHES = 30;
const PORCENTAJE_LIMPIEZA = 0.1;   // 10 % del subtotal
const PORCENTAJE_SERVICIO = 0.12;  // 12 % del subtotal
const CLAVE_STORAGE = 'reservas';

@Injectable({ providedIn: 'root' })
export class ReservaService {

  // ---------- Fechas ----------
  hoy(): string {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
  }

  calcularNoches(fechaEntrada: string, fechaSalida: string): number {
    if (!fechaEntrada || !fechaSalida) return 0;
    const entrada = new Date(fechaEntrada + 'T00:00:00');
    const salida = new Date(fechaSalida + 'T00:00:00');
    return Math.round((salida.getTime() - entrada.getTime()) / 86400000);
  }

  // ---------- Cotizacion ----------
  cotizar(precioNoche: number, fechaEntrada: string, fechaSalida: string): Cotizacion | null {
    const noches = this.calcularNoches(fechaEntrada, fechaSalida);
    if (noches < MIN_NOCHES) return null;

    const subtotal = precioNoche * noches;
    const tarifaLimpieza = Math.round(subtotal * PORCENTAJE_LIMPIEZA);
    const tarifaServicio = Math.round(subtotal * PORCENTAJE_SERVICIO);
    const total = subtotal + tarifaLimpieza + tarifaServicio;

    return { noches, precioNoche, subtotal, tarifaLimpieza, tarifaServicio, total };
  }

  // ---------- Validaciones: devuelve la lista de errores (vacia = todo bien) ----------
  validar(datos: DatosReserva): string[] {
    const errores: string[] = [];

    if (!datos.nombreHuesped.trim()) {
      errores.push('Escribe tu nombre completo.');
    }
    if (!/^\S+@\S+\.\S+$/.test(datos.correo)) {
      errores.push('Escribe un correo válido, por ejemplo nombre@correo.com.');
    }
    if (!datos.fechaEntrada || !datos.fechaSalida) {
      errores.push('Elige la fecha de entrada y la de salida.');
    } else {
      if (datos.fechaEntrada < this.hoy()) {
        errores.push('La fecha de entrada no puede ser anterior a hoy.');
      }
      const noches = this.calcularNoches(datos.fechaEntrada, datos.fechaSalida);
      if (noches < MIN_NOCHES) {
        errores.push('La fecha de salida debe ser posterior a la de entrada.');
      } else if (noches > MAX_NOCHES) {
        errores.push(`La estadía máxima es de ${MAX_NOCHES} noches.`);
      }
    }
    if (datos.huespedes < 1) {
      errores.push('Debe haber al menos 1 huésped.');
    } else if (datos.huespedes > datos.capacidad) {
      errores.push(`Este alojamiento admite máximo ${datos.capacidad} huéspedes.`);
    }
    if (this.hayCruce(datos.alojamientoId, datos.fechaEntrada, datos.fechaSalida)) {
      errores.push('Ya tienes una reserva en este alojamiento que se cruza con esas fechas.');
    }
    return errores;
  }

  // Dos rangos se cruzan si cada uno empieza antes de que termine el otro
  private hayCruce(alojamientoId: number, entrada: string, salida: string): boolean {
    return this.obtenerReservas().some(r =>
      r.alojamientoId === alojamientoId && entrada < r.fechaSalida && salida > r.fechaEntrada
    );
  }

  // ---------- localStorage ----------
  obtenerReservas(): Reserva[] {
    try {
      const guardado = localStorage.getItem(CLAVE_STORAGE);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  }

  private guardar(reservas: Reserva[]): void {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(reservas));
  }

  crearReserva(datos: DatosReserva): Reserva | null {
    const cotizacion = this.cotizar(datos.precioNoche, datos.fechaEntrada, datos.fechaSalida);
    if (!cotizacion) return null;

    const reserva: Reserva = {
      id: Date.now().toString(),
      alojamientoId: datos.alojamientoId,
      alojamientoNombre: datos.alojamientoNombre,
      fechaEntrada: datos.fechaEntrada,
      fechaSalida: datos.fechaSalida,
      huespedes: datos.huespedes,
      noches: cotizacion.noches,
      total: cotizacion.total,
      nombreHuesped: datos.nombreHuesped.trim(),
      correo: datos.correo.trim(),
      creadaEn: new Date().toISOString(),
    };
    this.guardar([...this.obtenerReservas(), reserva]);
    return reserva;
  }

  cancelarReserva(id: string): void {
    this.guardar(this.obtenerReservas().filter(r => r.id !== id));
  }
}