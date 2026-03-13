# Análisis Profundo de Despliegue: API Muestras en Vercel

Este informe proporciona un análisis técnico exhaustivo sobre la viabilidad, arquitectura y optimización necesaria para desplegar el backend en la infraestructura de Vercel.

---

## 1. Resumen Ejecutivo de Factibilidad

**Estado: Factible con Cambios Críticos.**
El proyecto tiene una estructura moderna y modular, lo cual facilita el despliegue. Sin embargo, existen inconsistencias en la configuración de Prisma y dependencias faltantes que provocarán errores de ejecución inmediatos si se intenta desplegar "tal cual".

---

## 2. Análisis Arquitectónico (Serverless)

### El Patrón "Monolito Express"
Vercel está diseñado para **Funciones Serverless**. Al usar `vercel.json` para redirigir todo el tráfico a `src/app.ts`, estás desplegando un "monolito" dentro de una función.
*   **Impacto**: Cada vez que una ruta es consultada, Vercel debe levantar toda la aplicación Express (Middleware, Rutas, Lógica).
*   **Recomendación**: Mantener el `app.ts` lo más ligero posible para minimizar los tiempos de **Cold Start** (arranque en frío).

### Gestión de Conexiones a Base de Datos
Actualmente intentas usar `@prisma/adapter-pg`. Esto es **excelente** para entornos serverless ya que permite una gestión de conexiones más eficiente que el motor binario estándar.
*   **Problema Detectado**: En `package.json` no existe la dependencia `pg` ni `@types/pg`, pero en `src/lib/prisma.ts` intentas usar el adaptador. Esto resultará en un error `Module Not Found`.
*   **Optimización**: Al usar Vercel + Prisma, el límite de conexiones de tu base de datos (ej. Supabase) puede agotarse rápido si hay mucho tráfico, ya que cada función serverless abre su propia conexión.

---

## 3. Puntos de Falla Críticos (Bloqueadores)

| Componente | Problema | Impacto |
| :--- | :--- | :--- |
| **Prisma Schema** | Generador tiene typo (`prisma-client`) y falta `url` en datasource. | `npx prisma generate` fallará en el build. |
| **Dependencies** | Faltan `pg` y `@types/pg`. | El adaptador de Prisma fallará al iniciar. |
| **Build Script** | No hay script `"build": "tsc"`. | Vercel no sabrá cómo compilar tus archivos `.ts` a `.js` de producción. |
| **Paths Alias** | `@config`, `@controllers`, etc. | Si no se configuran correctamente en el build, Node.js no encontrará los archivos en producción. |

---

## 4. Guía Técnica de Corrección (Deep-Dive)

### A. Preparación del Entorno Prisma
1.  **Instalar dependencias necesarias**:
    ```bash
    npm install pg
    npm install -D @types/pg
    ```
2.  **Corregir `prisma/schema.prisma`**:
    ```prisma
    generator client {
      provider = "prisma-client-js"
    }

    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }
    ```

### B. Optimización del Punto de Entrada (`src/app.ts`)
Para Vercel, el servidor no debe "escuchar" permanentemente. Debes exportar la `app` y solo escuchar en desarrollo:

```typescript
// src/app.ts
// ... imports ...
const app = express();
// ... middlewares y rutas ...

if (process.env.NODE_ENV !== "production") {
    app.listen(envs.PORT, () => {
        console.log(`Development server on port ${envs.PORT}`);
    });
}

export default app; // Crucial para Vercel
```

### C. Configuración de Compilación (`package.json`)
Añade un script de construcción para asegurar que TypeScript se compile antes del despliegue:
```json
"scripts": {
  "build": "tsc",
  "postinstall": "prisma generate"
}
```

---

## 5. Estrategia de Despliegue en 5 Pasos

1.  **Conexión de BD**: Asegúrate de que tu base de datos (PostgreSQL) permita conexiones externas y obtén la URI (ej. `postgresql://user:pass@host:port/db`).
2.  **Variables en Vercel**:
    *   `DATABASE_URL`: La URI de tu base de datos.
    *   `PORT`: `3000` (necesario para pasar la validación de Zod en `envs.ts`).
    *   `NODE_ENV`: `production`.
3.  **Comando de Instalación**: Vercel ejecutará `npm install`.
4.  **Comando de Construcción**: Vercel ejecutará `npm run build`.
5.  **Verificación**: Accede a `/api/samples` para confirmar que la conexión con la base de datos es exitosa.

---

## 6. Alternativas Sugeridas
Si experimentas latencia alta (Cold Starts), considera:
*   **Prisma Accelerate**: Un proxy de base de datos que optimiza conexiones y cacheo para serverless.
*   **Edge Runtime**: Desplazar lógica a funciones Edge de Vercel (requiere cambios más profundos).

---
*Este análisis fue generado tras una revisión exhaustiva de la lógica de controladores, middleware de validación y configuración de infraestructura del proyecto.*
