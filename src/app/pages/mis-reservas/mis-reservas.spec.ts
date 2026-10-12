import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MisReservas } from './mis-reservas';

describe('MisReservas', () => {
  let component: MisReservas;
  let fixture: ComponentFixture<MisReservas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisReservas],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MisReservas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});