import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Componente raíz: solo deja el espacio donde se montan las rutas.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
