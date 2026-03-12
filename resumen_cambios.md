He completado las siguientes tareas en el backend:

1. Modificado samples.controller.ts: Se añadió el await faltante en la creación de muestras.
2. Implementado visitor.controller.ts: Se crearon las funciones CRUD (Listar, Obtener por ID, Crear, Actualizar y Eliminar).
3. Creado delivery.controller.ts: Se implementó la lógica para manejar entregas, incluyendo la reducción automática de existencias de muestras mediante transacciones de Prisma.
4. Actualizado routes.ts: Se configuraron todas las rutas para las muestras, visitadores y entregas.
5. Actualizado app.ts: Se integró el router principal bajo el prefijo /api.
6. Añadida Validación con Zod: Se implementaron esquemas y un middleware de validación para asegurar que los datos enviados a la API sean correctos.
7. Añadido Entorno de Pruebas: Se configuró Vitest y Supertest, y se crearon 10 pruebas de integración que verifican el correcto funcionamiento de todos los módulos y la lógica de validación.

Puedes ejecutar las pruebas con el comando `npm test`.

