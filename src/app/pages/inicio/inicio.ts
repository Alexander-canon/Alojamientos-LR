import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Portada del marketplace. Empiezo por la estructura visible; en los
// siguientes pasos le agrego los datos y el carrusel de destinos.
@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {}
