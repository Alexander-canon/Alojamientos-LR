import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AlojamientoService } from '../../core/services/alojamiento.service';
import { AlojamientoCard } from '../../shared/components/alojamiento-card/alojamiento-card';
import { EstadoVacio } from '../../shared/components/estado-vacio/estado-vacio';
import { Filtros } from '../../shared/components/filtros/filtros';

// El listado lee el servicio y cada filtro es una señal; la grilla
// se recalcula sola cuando cambia alguno.
@Component({
  selector: 'app-alojamientos',
  imports: [AlojamientoCard, EstadoVacio, Filtros],
  templateUrl: './alojamientos.html',
  styleUrl: './alojamientos.css',
})
export class Alojamientos {
  private readonly alojamientoService = inject(AlojamientoService);

  private readonly router = inject(Router);

  // Mientras llega el JSON la lista inicia vacía y se llena sola.
  protected readonly alojamientos = toSignal(this.alojamientoService.listar(), {
    initialValue: [],
  });

  // Inician vacíos para que al entrar se vea todo.
  protected readonly ciudad = signal('');

  protected readonly huespedes = signal<number | null>(null);

  protected readonly tipo = signal('');

  protected readonly precioMax = signal<number | null>(null);

  // Ciudades y tipos únicos, salen de la data publicada.
  protected readonly ciudades = computed(() =>
    [...new Set(this.alojamientos().map((alojamiento) => alojamiento.ciudad))].sort()
  );

  protected readonly tipos = computed(() =>
    [...new Set(this.alojamientos().map((alojamiento) => alojamiento.tipo))].sort()
  );

  // Se aplican todos a la vez; los que están vacíos simplemente no cuentan.
  protected readonly filtrados = computed(() => {
    const ciudad = this.ciudad();
    const tipo = this.tipo();
    const huespedes = this.huespedes();
    const precioMax = this.precioMax();

    return this.alojamientos().filter((alojamiento) => {
      if (ciudad && alojamiento.ciudad !== ciudad) return false;
      if (tipo && alojamiento.tipo !== tipo) return false;
      if (huespedes !== null && alojamiento.capacidad < huespedes) return false;
      if (precioMax !== null && alojamiento.precioNoche > precioMax) return false;
      return true;
    });
  });

  protected alCambiarCiudad(valor: string): void {
    this.ciudad.set(valor);
  }

  protected alCambiarTipo(valor: string): void {
    this.tipo.set(valor);
  }

  protected alCambiarHuespedes(valor: number | null): void {
    this.huespedes.set(valor);
  }

  protected alCambiarPrecioMax(valor: number | null): void {
    this.precioMax.set(valor);
  }

  protected limpiar(): void {
    this.ciudad.set('');
    this.tipo.set('');
    this.huespedes.set(null);
    this.precioMax.set(null);
  }

  // Las tarjetas mandan el id y aquí se navega al detalle.
  protected verDetalle(id: number): void {
    this.router.navigate(['/alojamientos', id]);
  }
}