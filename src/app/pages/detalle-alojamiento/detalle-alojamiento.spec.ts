import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';
import { DetalleAlojamiento } from './detalle-alojamiento';

describe('DetalleAlojamiento', () => {
  let component: DetalleAlojamiento;
  let fixture: ComponentFixture<DetalleAlojamiento>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleAlojamiento],
      providers: [
        provideRouter([{ path: 'alojamientos/:id', component: DetalleAlojamiento }]),
        provideLocationMocks(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleAlojamiento);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
    httpMock.expectOne('assets/data/marketplace-data.json').flush([]);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});