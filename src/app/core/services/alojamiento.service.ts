import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Alojamiento } from '../models/alojamiento';
import { Resena } from '../models/resena';

// Forma del archivo JSON completo que vive en los assets.
interface MarketplaceData {
  alojamientos: Alojamiento[];
  resenas: Resena[];
}

// Toda la información del marketplace sale de un JSON, así que se lee una vez
// con HttpClient y se reutiliza la misma respuesta en las siguientes llamadas.
@Injectable({ providedIn: 'root' })
export class AlojamientoService {
  private readonly http = inject(HttpClient);
  private readonly ruta = 'assets/data/marketplace-data.json';

  private readonly datos$: Observable<MarketplaceData> = this.http
    .get<MarketplaceData>(this.ruta)
    .pipe(shareReplay(1));

  // El enunciado dice que los inactivos nunca se muestran, por eso se filtran acá.
  listar(): Observable<Alojamiento[]> {
    return this.datos$.pipe(
      map(datos => datos.alojamientos.filter(alojamiento => alojamiento.activo))
    );
  }

  obtenerPorId(id: number): Observable<Alojamiento | undefined> {
    return this.listar().pipe(
      map(lista => lista.find(alojamiento => alojamiento.id === id))
    );
  }

  // Los "destacados" del inicio son los mejor calificados.
  destacados(): Observable<Alojamiento[]> {
    return this.listar().pipe(
      map(lista => [...lista].sort((a, b) => b.calificacion - a.calificacion).slice(0, 3))
    );
  }

  // Puede volver vacío: hay alojamientos que todavía no tienen reseñas.
  resenasDe(alojamientoId: number): Observable<Resena[]> {
    return this.datos$.pipe(
      map(datos => datos.resenas.filter(resena => resena.alojamientoId === alojamientoId))
    );
  }
}
