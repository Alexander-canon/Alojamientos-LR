import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';
import { AlojamientoService } from '../../core/services/alojamiento.service';
import { ToastService } from '../../core/services/toast.service';
import { Alojamiento } from '../../core/models/alojamiento';
import { Resena } from '../../core/models/resena';
import { Reserva } from '../../core/models/reserva';
import { FormReserva } from '../../shared/components/form-reserva/form-reserva';
import { EstadoVacio } from '../../shared/components/estado-vacio/estado-vacio';

// El detalle lee el id de la URL y arma la página alrededor de ese alojamiento.
@Component({
  imports: [RouterLink, FormReserva, EstadoVacio],
  selector: 'app-detalle-alojamiento',
  styleUrl: './detalle-alojamiento.css',
  templateUrl: './detalle-alojamiento.html',
})
export class DetalleAlojamiento {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly alojamientoService = inject(AlojamientoService);
  private readonly toastService = inject(ToastService);

  private readonly formatoMoneda = new Intl.NumberFormat('es-CO');

  // El id viene en la URL; si cambia (de un detalle a otro), todo se recalcula.
  private readonly id$ = this.route.paramMap.pipe(
    map(parametros => parametros.get('id')),
    filter((id): id is string => id !== null),
    map(id => Number(id))
  );

  protected readonly alojamiento = toSignal(
    this.id$.pipe(switchMap(id => this.alojamientoService.obtenerPorId(id))),
    { initialValue: undefined }
  );

  // Distingue "cargando" de "no existe": la lista y el por-id salen de la misma
  // respuesta cacheada, así que cuando la lista llega, la búsqueda respondió.
  protected readonly cargada = toSignal(
    this.alojamientoService.listar().pipe(map(() => true)),
    { initialValue: false }
  );

  protected readonly resenas = toSignal(
    this.id$.pipe(switchMap(id => this.alojamientoService.resenasDe(id))),
    { initialValue: [] as Resena[] }
  );

  // Galería: la principal primero y las demás como miniaturas.
  protected readonly indiceImagen = signal(0);
  protected readonly imagenRota = signal(false);

  protected readonly imagenes = computed(() => {
    const alojamiento = this.alojamiento();
    if (!alojamiento) return [];
    const extras = alojamiento.imagenes.filter(url => url !== alojamiento.imagenPrincipal);
    return [alojamiento.imagenPrincipal, ...extras];
  });

  protected readonly imagenActual = computed(
    () => this.imagenes()[this.indiceImagen()] ?? ''
  );

  // Al cambiar de alojamiento, volver a la primera foto y reiniciar el estado.
  private readonly reiniciarGaleria = effect(() => {
    void this.alojamiento()?.id;
    this.indiceImagen.set(0);
    this.imagenRota.set(false);
  });

  formatearPrecio(valor: number): string {
    return `$${this.formatoMoneda.format(valor)}`;
  }

  elegirImagen(indice: number): void {
    this.indiceImagen.set(indice);
    this.imagenRota.set(false);
  }

  enErrorImagen(): void {
    this.imagenRota.set(true);
  }

  irAListado(): void {
    this.router.navigate(['/alojamientos']);
  }

  onReservaCreada(_reserva: Reserva): void {
    this.toastService.mostrar('Reserva confirmada. Revisa la sección Mis reservas.');
    this.router.navigate(['/mis-reservas']);
  }
}