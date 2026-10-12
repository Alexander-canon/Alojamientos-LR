import { Component, EventEmitter, Input, Output } from '@angular/core';

// Avisa qué cambió y nada más; el padre decide.
@Component({
  selector: 'app-filtros',
  imports: [],
  templateUrl: './filtros.html',
  styleUrl: './filtros.css',
})
export class Filtros {
  @Input() ciudades: string[] = [];

  @Input() tipos: string[] = [];

  @Input() ciudad = '';

  @Input() tipo = '';

  @Input() huespedes: number | null = null;

  @Input() precioMax: number | null = null;

  @Output() ciudadChange = new EventEmitter<string>();

  @Output() tipoChange = new EventEmitter<string>();

  @Output() huespedesChange = new EventEmitter<number | null>();

  @Output() precioMaxChange = new EventEmitter<number | null>();

  @Output() limpiar = new EventEmitter<void>();

  // Si quedan vacíos van como null y no filtran.
  alCambiarHuespedes(valor: string): void {
    this.huespedesChange.emit(valor ? Number(valor) : null);
  }

  alCambiarPrecio(valor: string): void {
    this.precioMaxChange.emit(valor ? Number(valor) : null);
  }
}