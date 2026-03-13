-- 1. Crear tabla Muestras
CREATE TABLE "Muestras" (
    "id" SERIAL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "existencias" INTEGER NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Crear tabla Visitadores
CREATE TABLE "Visitadores" (
    "id" SERIAL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "zona" TEXT NOT NULL,
    "muestras_asignadas" INTEGER NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crear tabla Entregas
CREATE TABLE "Entregas" (
    "id" SERIAL PRIMARY KEY,
    "muestras_id" INTEGER NOT NULL REFERENCES "Muestras"("id") ON DELETE CASCADE,
    "visitadores_id" INTEGER NOT NULL REFERENCES "Visitadores"("id") ON DELETE CASCADE,
    "cantidad" INTEGER NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Función para actualizar el campo updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_muestras_updated_at BEFORE UPDATE ON "Muestras" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_visitadores_updated_at BEFORE UPDATE ON "Visitadores" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_entregas_updated_at BEFORE UPDATE ON "Entregas" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
