import { Component, EventEmitter, Input, Output } from '@angular/core';

// Bloque para cuando no hay resultados. Muestra un mensaje y, si le paso un
// texto de acción, un botón para salir del estado vacío.
@Component({
  selector: 'app-estado-vacio',
  imports: [],
  templateUrl: './estado-vacio.html',
  styleUrl: './estado-vacio.css',
})
export class EstadoVacio {
  @Input() titulo = 'No hay nada por aquí';

  @Input() mensaje = '';

  @Input() textoAccion = '';

  @Output() accion = new EventEmitter<void>();
}
