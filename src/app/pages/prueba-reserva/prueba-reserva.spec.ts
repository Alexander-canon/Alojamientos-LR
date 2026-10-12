import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PruebaReserva } from './prueba-reserva';

describe('PruebaReserva', () => {
  let component: PruebaReserva;
  let fixture: ComponentFixture<PruebaReserva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaReserva],
    }).compileComponents();

    fixture = TestBed.createComponent(PruebaReserva);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
