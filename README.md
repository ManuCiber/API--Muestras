# API Muestras Médicas

Backend para la gestión de muestras médicas, visitadores y entregas.

## Características

-   **Muestras**: Gestión de inventario de muestras médicas.
-   **Visitadores**: Registro y seguimiento de visitadores médicos.
-   **Entregas**: Registro de entregas de muestras con gestión automática de stock.
-   **Validación**: Esquemas de validación robustos con **Zod**.
-   **Pruebas**: Suite de pruebas de integración con **Vitest** y **Supertest**.
-   **ORM**: **Prisma** con soporte para transacciones.

## Requisitos

-   Node.js v20+
-   PostgreSQL (Supabase, Neon, etc.)

## Instalación

1.  Clonar el repositorio.
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Configurar variables de entorno en un archivo `.env` (ver `.env.example` si existe, o usar `DATABASE_URL`).
4.  Generar el cliente de Prisma:
    ```bash
    npx prisma generate
    ```

## Ejecución

-   **Desarrollo**: `npm run dev`
-   **Pruebas**: `npm test`
-   **Producción**: `npm start`

## API Endpoints

### Muestras (`/api/samples`)
- `GET /`: Listar todas las muestras.
- `GET /:id`: Obtener una muestra por ID.
- `POST /`: Crear una nueva muestra.
- `PUT /:id`: Actualizar una muestra.
- `DELETE /:id`: Eliminar una muestra.

### Visitadores (`/api/visitors`)
- `GET /`: Listar todos los visitadores.
- `GET /:id`: Obtener un visitador por ID.
- `POST /`: Crear un nuevo visitador.
- `PUT /:id`: Actualizar un visitador.
- `DELETE /:id`: Eliminar un visitador.

### Entregas (`/api/deliveries`)
- `GET /`: Listar todas las entregas.
- `GET /:id`: Obtener una entrega por ID.
- `POST /`: Crear una entrega (descuenta stock automáticamente).
- `PUT /:id`: Actualizar entrega.
- `DELETE /:id`: Eliminar entrega.
