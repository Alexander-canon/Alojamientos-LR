# Alojamientos LR

Plataforma web para la publicación y reserva de alojamientos turísticos del proyecto "Inversiones LR". Permite explorar los alojamientos disponibles, filtrar por ciudad, ver el detalle con fotos y reseñas, cotizar una estadía y confirmar la reserva.

## Integrantes

- Kevin Martinez
- Sebastian
- Alexander Canon

## Tecnologías

- Angular (v20, standalone components) con TypeScript.
- Sass/CSS con diseño mobile-first y arquitectura BEM.
- Angular Router para la navegación entre pantallas.
- Angular Forms para la captura de datos de reserva.
- `HttpClient` para cargar los alojamientos desde `marketplace-data.json`.
- `localStorage` para persistir las reservas durante la ejecución.

## Requisitos

- Node.js 20 o superior.
- Angular CLI 20 o superior.

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

Se abre en `http://localhost:4200`.

## Principales funcionalidades

- **Listado de alojamientos**: tarjetas con foto, nombre, ubicación, precio por noche, calificación y reseñas.
- **Filtros**: por ciudad y orden de precio (ascendente / descendente).
- **Detalle del alojamiento**: galería de fotos, servicios, capacidades, reseñas y formulario de reserva.
- **Cotización y reserva**: cálculo de noches, tarifa de limpieza y tarifa de servicio (10% del subtotal). La reserva solo se puede confirmar después de revisar la cotización del total.
- **Mis reservas**: listado de las reservas confirmadas con sus datos.
- **Validación de datos**: fechas, huéspedes y correo según las reglas de negocio.

## Estructura del proyecto

```
src/
  app/
    core/
      models/        # Alojamiento, Reserva, Cotizacion y Resena
      services/      # AlojamientoService, ReservaService y ToastService
    pages/
      inicio/        # Portada
      alojamientos/  # Listado y filtros
      detalle-alojamiento/
      mis-reservas/
    shared/
      components/    # Header, Footer, Cotizador, Filtros, etc.
  assets/            # Datos de alojamientos (marketplace-data.json)
public/
  assets/data/       # Ubicación real del archivo de datos
```

## URL del repositorio

https://github.com/Alexander-canon/Alojamientos-LR