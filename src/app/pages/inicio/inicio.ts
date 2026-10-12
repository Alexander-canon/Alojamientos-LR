import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AlojamientoService } from '../../core/services/alojamiento.service';
import { AlojamientoCard } from '../../shared/components/alojamiento-card/alojamiento-card';

/** Un destino que viaja en el carrusel de la portada. */
interface Destino {
  nombre: string;
  ciudad: string;
  tipo: string;
}

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, AlojamientoCard],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  private readonly router = inject(Router);
  private readonly alojamientoService = inject(AlojamientoService);

  // Dejo los destinos escritos aquí porque son una selección editorial de la
  // portada, no un filtro sobre los alojamientos del JSON.
  protected readonly destinos: Destino[] = [
    { nombre: 'Apartamento frente al mar', ciudad: 'Cartagena', tipo: 'Apartamento' },
    { nombre: 'Cabaña en Guatapé', ciudad: 'Guatapé', tipo: 'Cabaña' },
    { nombre: 'Loft moderno en Chapinero', ciudad: 'Bogotá', tipo: 'Apartamento' },
    { nombre: 'Casa colonial en Villa de Leyva', ciudad: 'Villa de Leyva', tipo: 'Casa' },
  ];

  // Los destacados salen del servicio: los mejor calificados entre activos.
  protected readonly destacados = toSignal(this.alojamientoService.destacados(), {
    initialValue: [],
  });

  // Guardo el slide visible del carrusel en una señal, así el cambio se
  // refleja solo cuando muevo el índice.
  protected readonly indice = signal(0);
  protected readonly destinoActivo = computed(() => this.destinos[this.indice()]);

  protected irA(indice: number): void {
    this.indice.set(indice);
  }

  protected anterior(): void {
    this.indice.update((i) => (i - 1 + this.destinos.length) % this.destinos.length);
  }

  protected siguiente(): void {
    this.indice.update((i) => (i + 1) % this.destinos.length);
  }

  // Cuando la tarjeta pide el detalle me voy a la página de ese alojamiento.
  protected verDetalle(id: number): void {
    this.router.navigate(['/alojamientos', id]);
  }
}