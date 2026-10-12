import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormReserva } from './form-reserva';
import { Alojamiento } from '../../../core/models/alojamiento';

const alojamiento: Alojamiento = {
  id: 1,
  nombre: 'Apartamento prueba',
  descripcion: 'Un apartamento de prueba',
  ciudad: 'Bogotá',
  ubicacion: 'Centro',
  tipo: 'Apartamento',
  capacidad: 4,
  habitaciones: 2,
  camas: 2,
  banos: 1,
  precioNoche: 200000,
  tarifaLimpieza: 40000,
  calificacion: 4.5,
  activo: true,
  imagenPrincipal: 'https://images.unsplash.com/photo-1?auto=format&fit=crop&w=1200&q=80',
  imagenes: [],
  servicios: [],
  reglas: [],
};

describe('FormReserva', () => {
  let component: FormReserva;
  let fixture: ComponentFixture<FormReserva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormReserva],
    }).compileComponents();

    fixture = TestBed.createComponent(FormReserva);
    component = fixture.componentInstance;
    component.alojamiento = alojamiento;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});