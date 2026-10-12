import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from '../../core/services/reserva.service';
import { Reserva } from '../../core/models/reserva';
import { EstadoVacio } from '../../shared/components/estado-vacio/estado-vacio';

// La página lista las reservas guardadas durante la ejecución. Solo presenta
// la información; cuando no hay reservas, el estado vacío invita a explorar.
@Component({
  imports: [EstadoVacio],
  selector: 'app-mis-reservas',
  styleUrl: './mis-reservas.css',
  templateUrl: './mis-reservas.html',
})
export class MisReservas implements OnInit {

  reservas: Reserva[] = [];

  private readonly formatoMoneda = new Intl.NumberFormat('es-CO');

  constructor(
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarReservas();
  }

  cargarReservas() {
    this.reservas = this.reservaService.obtenerReservas();
  }

  formatearPrecio(valor: number): string {
    return `$${this.formatoMoneda.format(valor)}`;
  }

  // Las fechas se guardan en formato ISO (aaaa-mm-dd) y acá se leen en español.
  formatearFecha(iso: string): string {
    const [anno, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${anno}`;
  }

  irAAlojamientos(): void {
    this.router.navigate(['/alojamientos']);
  }
}