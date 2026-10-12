import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// Barra superior que aparece en todas las pantallas. El RouterLinkActive se
// encarga de resaltar la opción en la que estoy parado.
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
