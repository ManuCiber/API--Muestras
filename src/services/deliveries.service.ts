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
    const { muestra_id, cantidad, fecha, hora } = data;

    // Use transaction for atomic operation
    return await prisma.$transaction(async (tx) => {
      // 1. Check if enough stock exists
      const sample = await tx.muestras.findUnique({
        where: { id: muestra_id },
      });

      if (!sample || sample.existencias < cantidad) {
        throw new AppError("Insufficient stock or sample not found", 400);
      }

      // 2. Prepare data with default values for fecha/hora if missing
      const deliveryData = {
        ...data,
        fecha: fecha ? new Date(fecha) : new Date(),
        hora: hora ? new Date(`1970-01-01T${hora}`) : new Date(),
      };

      // 3. Create the delivery
      const delivery = await tx.entregas.create({ 
        data: deliveryData as any 
      });

      // 4. Update stock
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
  }

  static async delete(id: string) {
    try {
      return await prisma.entregas.delete({ where: { id } });
    } catch (error) {
      throw new AppError("Delivery not found or delete failed", 404);
    }
  }
}
