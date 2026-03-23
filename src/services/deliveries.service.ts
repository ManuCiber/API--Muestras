import { prisma } from "@lib/prisma";
import { AppError } from "@lib/app-error";

export class DeliveriesService {
  static async getAll() {
    return await prisma.entregas.findMany({
      include: {
        muestra: true,
        visitador: true,
      },
    });
  }

  static async getById(id: string) {
    const delivery = await prisma.entregas.findUnique({
      where: { id },
      include: {
        muestra: true,
        visitador: true,
      },
    });
    if (!delivery) throw new AppError("Delivery not found", 404);
    return delivery;
  }

  static async create(data: { muestra_id: string; visitador_id: string; cantidad: number; fecha?: string; hora?: string; estado?: string }) {
    const { muestra_id, visitador_id, cantidad, fecha, hora, estado } = data;

    try {
      // 1. Check if visitor exists (prevent P2003 in transaction for better error message)
      const visitor = await prisma.visitadores.findUnique({ where: { id: visitador_id } });
      if (!visitor) throw new AppError("Visitador not found", 404);

      // Use transaction for atomic operation
      return await prisma.$transaction(async (tx) => {
        // 2. Check if enough stock exists
        const sample = await tx.muestras.findUnique({
          where: { id: muestra_id },
        });

        if (!sample) throw new AppError("Sample not found", 404);
        if (sample.existencias < cantidad) {
          throw new AppError(`Insufficient stock. Available: ${sample.existencias}, requested: ${cantidad}`, 400);
        }

        // 3. Prepare data with default values for fecha/hora if missing
        // Using UTC for consistency if no timezone is provided
        const finalFecha = fecha ? new Date(`${fecha}T00:00:00Z`) : new Date();
        const finalHora = hora ? new Date(`1970-01-01T${hora}:00Z`) : new Date();

        // 4. Create the delivery
        const deliveryData = {
          muestra_id,
          visitador_id,
          cantidad,
          fecha: finalFecha,
          hora: finalHora,
          estado: estado || "Entregado",
          nombre_muestra: sample.nombre,
          nombre_visitador: visitor.nombre,
        };

        const delivery = await tx.entregas.create({ 
          data: deliveryData
        });

        // 5. Update stock
        await tx.muestras.update({
          where: { id: muestra_id },
          data: {
            existencias: {
              decrement: cantidad,
            },
          },
        });

        return delivery;
      });
    } catch (error) {
       if (error instanceof AppError) throw error;
       console.error("[DeliveriesService] Error creating delivery:", error);
       throw new AppError("Failed to create delivery due to an internal error", 500);
    }
  }

  static async delete(id: string) {
    try {
      return await prisma.entregas.delete({ where: { id } });
    } catch (error) {
      throw new AppError("Delivery not found or delete failed", 404);
    }
  }
}
