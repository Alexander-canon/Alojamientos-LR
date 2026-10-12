export interface Reserva {
  id: string;
  alojamientoId: number;
  alojamientoNombre: string;
  ciudad: string;
  fechaEntrada: string; // formato AAAA-MM-DD
  fechaSalida: string;  // formato AAAA-MM-DD
  huespedes: number;
  noches: number;
  tarifaLimpieza: number;
  total: number;
  estado: 'CONFIRMADA';
  nombreHuesped: string;
  correo: string;
  creadaEn: string;
}

// Datos que llegan desde el formulario
export interface DatosReserva {
  alojamientoId: number;
  alojamientoNombre: string;
  ciudad: string;
  precioNoche: number;
  tarifaLimpieza: number;
  capacidad: number;
  fechaEntrada: string;
  fechaSalida: string;
  huespedes: number;
  nombreHuesped: string;
  correo: string;
}