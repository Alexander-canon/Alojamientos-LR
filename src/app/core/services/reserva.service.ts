import { Injectable } from '@angular/core';
import { Cotizacion } from '../models/cotizacion';
import { DatosReserva, Reserva } from '../models/reserva';

// Reglas de negocio definidas en el enunciado del proyecto.
const MIN_NOCHES = 1;
const PORCENTAJE_SERVICIO = 0.1;
const CLAVE_STORAGE = 'reservas';

@Injectable({ providedIn: 'root' })
export class ReservaService {

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

  // La limpieza no depende de las noches, es el valor fijo que trae cada
  // alojamiento; el servicio sí va como porcentaje del subtotal.
  cotizar(precioNoche: number, tarifaLimpieza: number, fechaEntrada: string, fechaSalida: string): Cotizacion | null {
    const noches = this.calcularNoches(fechaEntrada, fechaSalida);
    if (noches < MIN_NOCHES) return null;

    const subtotal = precioNoche * noches;
    const tarifaServicio = Math.round(subtotal * PORCENTAJE_SERVICIO);
    const total = subtotal + tarifaLimpieza + tarifaServicio;

    return { noches, precioNoche, subtotal, tarifaLimpieza, tarifaServicio, total };
  }

  // Si no hay nada que reclamar, el arreglo vuelve vacío y seguimos.
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
      }
    }
    if (datos.huespedes < 1) {
      errores.push('Debe haber al menos 1 huésped.');
    } else if (datos.huespedes > datos.capacidad) {
      errores.push(`Este alojamiento admite máximo ${datos.capacidad} huéspedes.`);
    }
    return errores;
  }

  // Las reservas quedan guardadas en localStorage porque no hay backend.
  obtenerReservas(): Reserva[] {
    try {
      const guardado = localStorage.getItem(CLAVE_STORAGE);
      const reservas: Reserva[] = guardado ? JSON.parse(guardado) : [];
      return reservas.map(r => ({ ...r, ciudad: r.ciudad ?? '' }));
    } catch {
      return [];
    }
  }

  private guardar(reservas: Reserva[]): void {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(reservas));
  }

  crearReserva(datos: DatosReserva): Reserva | null {
    const cotizacion = this.cotizar(
      datos.precioNoche,
      datos.tarifaLimpieza,
      datos.fechaEntrada,
      datos.fechaSalida
    );
    if (!cotizacion) return null;

    const reserva: Reserva = {
      id: `RES-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      alojamientoId: datos.alojamientoId,
      alojamientoNombre: datos.alojamientoNombre,
      ciudad: datos.ciudad,
      fechaEntrada: datos.fechaEntrada,
      fechaSalida: datos.fechaSalida,
      huespedes: datos.huespedes,
      noches: cotizacion.noches,
      tarifaLimpieza: cotizacion.tarifaLimpieza,
      total: cotizacion.total,
      estado: 'CONFIRMADA',
      nombreHuesped: datos.nombreHuesped.trim(),
      correo: datos.correo.trim(),
      creadaEn: new Date().toISOString(),
    };
    this.guardar([...this.obtenerReservas(), reserva]);
    return reserva;
  }
}