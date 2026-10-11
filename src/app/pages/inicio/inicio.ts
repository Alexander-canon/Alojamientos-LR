import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Un destino que viaja en el carrusel de la portada. */
interface Destino {
  nombre: string;
  ciudad: string;
  tipo: string;
}

/** Un alojamiento resumido para la grilla de destacados. */
interface Destacado {
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

  protected readonly destacados: Destacado[] = [
    {
      nombre: 'Loft moderno en Chapinero',
      ciudad: 'Bogotá',
      ubicacion: 'Chapinero',
      tipo: 'Apartamento',
      capacidad: 2,
      camas: 1,
      calificacion: 4.8,
      precioNoche: 180000,
      servicios: ['Wi-Fi', 'Cocina', 'Televisión'],
    },
    {
      nombre: 'Apartamento frente al mar',
      ciudad: 'Cartagena',
      ubicacion: 'Bocagrande',
      tipo: 'Apartamento',
      capacidad: 5,
      camas: 3,
      calificacion: 4.9,
      precioNoche: 420000,
      servicios: ['Wi-Fi', 'Piscina', 'Aire acondicionado'],
    },
    {
      nombre: 'Cabaña en Guatapé',
      ciudad: 'Guatapé',
      ubicacion: 'Guatapé',
      tipo: 'Cabaña',
      capacidad: 6,
      camas: 4,
      calificacion: 4.7,
      precioNoche: 350000,
      servicios: ['Wi-Fi', 'Cocina', 'Parqueadero'],
    },
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

  // Doy formato al precio en pesos con separador de miles.
  private readonly formatoMoneda = new Intl.NumberFormat('es-CO');

  protected formatearPrecio(valor: number): string {
    return `$${this.formatoMoneda.format(valor)}`;
  }
}
