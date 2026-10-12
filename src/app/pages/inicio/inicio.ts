import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AlojamientoService } from '../../core/services/alojamiento.service';
import { AlojamientoCard } from '../../shared/components/alojamiento-card/alojamiento-card';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, AlojamientoCard],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  private readonly router = inject(Router);
  private readonly alojamientoService = inject(AlojamientoService);

  // Los alojamientos activos (en el orden del JSON) alimentan tanto el carrusel
  // de destinos como la grilla de destacados.
  protected readonly alojamientos = toSignal(this.alojamientoService.listar(), {
    initialValue: [],
  });

  // Guardo el slide visible del carrusel en una señal, así el cambio se
  // refleja solo cuando muevo el índice.
  protected readonly indice = signal(0);
  protected readonly destinoActivo = computed(() => this.alojamientos()[this.indice()]);

  protected irA(indice: number): void {
    this.indice.set(indice);
  }

  protected anterior(): void {
    const total = this.alojamientos().length;
    if (total === 0) return;
    this.indice.update((i) => (i - 1 + total) % total);
  }

  protected siguiente(): void {
    const total = this.alojamientos().length;
    if (total === 0) return;
    this.indice.update((i) => (i + 1) % total);
  }

  // Cuando la tarjeta pide el detalle me voy a la página de ese alojamiento.
  protected verDetalle(id: number): void {
    this.router.navigate(['/alojamientos', id]);
  }
}
