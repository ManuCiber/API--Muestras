# Guía de Despliegue en Vercel

Sigue estos pasos para desplegar tu API de Muestras Médicas en Vercel.

## 1. Preparación del Proyecto

Asegúrate de que tu `package.json` tiene los scripts correctos (ya configurado):
- `"start": "node src/app.ts"` (Vercel usará esto o el build).

Como es un proyecto TypeScript puro con Prisma, necesitamos configurar Vercel para manejar las funciones serverless de Node.js.

## 2. Configuración de Vercel (vercel.json)

Crea un archivo `vercel.json` en la raíz (ya creado por mí) con el siguiente contenido:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/app.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "src/app.ts"
    }
  ]
}
```

## 3. Variables de Entorno

En el Dashboard de Vercel (Settings > Environment Variables), añade:

- `DATABASE_URL`: Tu cadena de conexión de PostgreSQL.
- `PORT`: 3000 (o lo que utilices, aunque Vercel lo maneja dinámicamente).

## 4. Despliegue

1.  Usa la CLI de Vercel:
    ```bash
    vercel
    ```
2.  O conecta tu repositorio de GitHub a Vercel para despliegue automático.

## 5. Nota Importante sobre Prisma

Añade un script de `postinstall` en tu `package.json` para generar el cliente de Prisma en Vercel:

```json
"scripts": {
  "postinstall": "prisma generate"
}
```
*(Ya lo añadiré por ti en el siguiente paso)*
