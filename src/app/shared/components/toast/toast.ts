import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

// Se monta una sola vez en el componente raíz y muestra el último aviso.
@Component({
  imports: [],
  selector: 'app-toast',
  styleUrl: './toast.css',
  templateUrl: './toast.html',
})
export class Toast {
  private readonly toastService = inject(ToastService);

  protected readonly visible = this.toastService.visible;
  protected readonly mensaje = this.toastService.mensaje;
}