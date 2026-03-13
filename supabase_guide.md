# Guía de Despliegue de Base de Datos en Supabase

Esta guía te explica cómo subir las tablas de tu proyecto a Supabase de manera rápida y sencilla.

## Paso 1: Crear el Proyecto en Supabase
1. Ve a [Supabase](https://supabase.com/) e inicia sesión.
2. Crea un nuevo proyecto (New Project).
3. Guarda bien la **Password** de la base de datos, la necesitarás para tu `DATABASE_URL`.

## Paso 2: Ejecutar el Script SQL
Una vez que tu proyecto esté listo:
1. En el menú lateral izquierdo, haz clic en **SQL Editor**.
2. Haz clic en **+ New query**.
3. Abre el archivo `setup_supabase.sql` que acabo de crear para ti.
4. Copia todo el contenido del archivo y pégalo en el editor de Supabase.
5. Haz clic en el botón **Run** (esquina inferior derecha).

*¡Listo! Tus tablas `Muestras`, `Visitadores` y `Entregas` ya están creadas con sus relaciones y triggers de actualización.*

## Paso 3: Conectar tu Backend (Variable de Entorno)
Para que tu API se comunique con Supabase, necesitas la URL de conexión:
1. Ve a **Project Settings** (el icono de engranaje) -> **Database**.
2. Busca la sección **Connection string** y selecciona **URI**.
3. Copia esa URL. Se ve algo como: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres`
4. Reemplaza `[YOUR-PASSWORD]` por la contraseña que creaste en el Paso 1.
5. Pega esta URL en tu archivo `.env` (local) y en las variables de entorno de **Vercel** bajo el nombre `DATABASE_URL`.

## Paso 4: Sincronizar Prisma (Opcional pero Recomendado)
Si ya tienes las tablas en Supabase, puedes ejecutar este comando en tu terminal local para asegurarte de que Prisma esté en sintonía:
```bash
npx prisma generate
```

> [!TIP]
> Si en el futuro haces cambios en `schema.prisma`, puedes usar `npx prisma db push` para subir esos cambios directamente a Supabase sin escribir SQL manualmente.
