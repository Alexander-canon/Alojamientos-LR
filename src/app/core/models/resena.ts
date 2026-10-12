// Una reseña hecha por un huésped sobre un alojamiento concreto.
export interface Resena {
  id: number;
  alojamientoId: number;
  usuario: string;
  calificacion: number;
  comentario: string;
}
