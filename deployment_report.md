# Informe de Factibilidad y Guía de Despliegue en Vercel

Este documento detalla el estado actual del proyecto para su despliegue en Vercel, los problemas identificados y los pasos necesarios para una implementación exitosa.

## 1. Análisis de Factibilidad

**¿Es factible subir el backend a Vercel?**
**Sí, es totalmente factible.** Vercel soporta aplicaciones de Node.js (con Express) de manera eficiente. Sin embargo, el proyecto actual tiene algunos "bloqueadores" técnicos que impedirán que el despliegue funcione a la primera.

### Problemas Identificados:
1.  **Error en `schema.prisma`**: El proveedor del cliente está mal escrito (`prisma-client` en lugar de `prisma-client-js`).
2.  **Configuración de Base de Datos**: El archivo `schema.prisma` no tiene definida la variable de entorno para la conexión (`url`).
3.  **Punto de Entrada (`app.ts`)**: El servidor está configurado para escuchar en un puerto fijo (`app.listen`), lo cual puede causar conflictos en el entorno serverless de Vercel si no se maneja correctamente.
4.  **Generación de Prisma**: Aunque tienes el `postinstall`, la ubicación de salida del cliente (`output`) puede ser problemática en Vercel si no se usa la ruta por defecto (`node_modules`).

---

## 2. Paso a Paso para Corregir Problemas

Sigue estos pasos en orden para preparar tu proyecto:

### Paso 1: Corregir el archivo `prisma/schema.prisma`
Modifica las primeras líneas de tu archivo `prisma/schema.prisma` para que queden así:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
> [!NOTE]
> He eliminado el `output` personalizado para que se guarde en `node_modules`, que es la forma más compatible con Vercel.

### Paso 2: Ajustar `src/app.ts` (Opcional pero Recomendado)
Para evitar que el servidor intente abrir un puerto en Vercel (donde Vercel maneja el puerto), puedes hacer el `listen` condicional:

```typescript
// En src/app.ts
if (process.env.NODE_ENV !== 'production') {
    app.listen(envs.PORT, () => {
        console.log(`Server is running on port ${envs.PORT}`);
    });
}
```

### Paso 3: Verificar `vercel.json`
Asegúrate de que tu `vercel.json` esté configurado para dirigir las peticiones correctamente. El que tienes es un buen comienzo, pero podrías simplificarlo:

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
      "src": "/(.*)",
      "dest": "src/app.ts"
    }
  ]
}
```

---

## 3. Guía de Despliegue

Una vez realizados los cambios anteriores, sigue estos pasos:

1.  **Sube tus cambios a GitHub/GitLab/Bitbucket.**
2.  **Entra en [Vercel](https://vercel.com/)** y crea un nuevo proyecto.
3.  **Importa tu repositorio.**
4.  **Configura las Variables de Entorno**:
    *   `DATABASE_URL`: Tu cadena de conexión de Supabase/Neon/etc.
    *   `PORT`: Puedes ponerle `3000` (aunque Vercel lo sobreescribe, tu validador Zod lo requiere).
5.  **Desplegar**: Vercel detectará el comando `npm run postinstall` y generará el cliente de Prisma automáticamente.

## 4. Solución de Errores Comunes en el Despliegue

*   **Error "Prisma Client could not find its engine"**: Asegúrate de que el comando `prisma generate` se ejecute en el `postinstall` de tu `package.json`.
*   **Error 500 / "Invalid Environment Variables"**: Revisa que hayas añadido `DATABASE_URL` y `PORT` en el panel de Vercel.
*   **Error 404**: Verifica que las `routes` en `vercel.json` apunten correctamente a tu archivo `app.ts`.

---
¡Con estos cambios, tu backend debería estar listo para brillar en Vercel!
