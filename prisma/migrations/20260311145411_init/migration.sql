-- CreateTable
CREATE TABLE "Muestras" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "existencias" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Muestras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitadores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "zona" TEXT NOT NULL,
    "muestras_asignadas" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entregas" (
    "id" SERIAL NOT NULL,
    "muestras_id" INTEGER NOT NULL,
    "visitadores_id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entregas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Entregas" ADD CONSTRAINT "Entregas_muestras_id_fkey" FOREIGN KEY ("muestras_id") REFERENCES "Muestras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entregas" ADD CONSTRAINT "Entregas_visitadores_id_fkey" FOREIGN KEY ("visitadores_id") REFERENCES "Visitadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
