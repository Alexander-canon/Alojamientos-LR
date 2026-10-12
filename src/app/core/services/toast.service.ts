import { Injectable, signal } from '@angular/core';

// Avisos cortos al pie de la pantalla. Vive solo en memoria: cada aviso
// desaparece solo después de unos segundos.
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly visibleS = signal(false);
  private readonly mensajeS = signal('');

  visible = this.visibleS.asReadonly();
  mensaje = this.mensajeS.asReadonly();

  private temporizador: ReturnType<typeof setTimeout> | null = null;
  private readonly duracion = 4000;

  mostrar(mensaje: string): void {
    this.mensajeS.set(mensaje);
    this.visibleS.set(true);

    if (this.temporizador) {
      clearTimeout(this.temporizador);
    }
    this.temporizador = setTimeout(() => this.visibleS.set(false), this.duracion);
  }

  ocultar(): void {
    if (this.temporizador) {
      clearTimeout(this.temporizador);
      this.temporizador = null;
    }
    this.visibleS.set(false);
  }
}