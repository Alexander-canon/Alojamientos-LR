import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Un destino que viaja en el carrusel de la portada. */
interface Destino {
  nombre: string;
  ciudad: string;
  tipo: string;
}

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  // Dejo estos datos escritos aquí por ahora; cuando tenga AlojamientoService
  // los voy a traer del JSON para no duplicar la información.
  protected readonly destinos: Destino[] = [
    { nombre: 'Apartamento frente al mar', ciudad: 'Cartagena', tipo: 'Apartamento' },
    { nombre: 'Cabaña en Guatapé', ciudad: 'Guatapé', tipo: 'Cabaña' },
    { nombre: 'Loft moderno en Chapinero', ciudad: 'Bogotá', tipo: 'Apartamento' },
    { nombre: 'Casa colonial en Villa de Leyva', ciudad: 'Villa de Leyva', tipo: 'Casa' },
  ];

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
}
