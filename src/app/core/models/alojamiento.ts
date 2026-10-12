// PROVISIONAL: mismos campos que Alexander usa en inicio.ts, mas el id.
// Cuando Alexander cree la interface oficial, se deja una sola.
export interface Alojamiento {
  id: number;
  nombre: string;
  ciudad: string;
  ubicacion: string;
  tipo: string;
  capacidad: number;
  camas: number;
  calificacion: number;
  precioNoche: number;
  servicios: string[];
}