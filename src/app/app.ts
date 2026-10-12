import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Toast } from './shared/components/toast/toast';

// Componente raíz: monta el header y el footer que comparten todas las
// pantallas, y en medio deja el espacio donde entran las rutas.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
