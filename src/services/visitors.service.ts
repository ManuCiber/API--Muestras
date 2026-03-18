import { prisma } from "@lib/prisma";
import { AppError } from "@lib/app-error";

export class VisitorsService {
  static async getAll() {
    return await prisma.visitadores.findMany();
  }

  static async getById(id: string) {
    const visitor = await prisma.visitadores.findUnique({ where: { id } });
    if (!visitor) throw new AppError("Visitor not found", 404);
    return visitor;
  }

  static async create(data: { nombre: string; zona: string; muestras_asignadas: number }) {
    return await prisma.visitadores.create({ data });
  }

  static async update(id: string, data: any) {
    try {
      return await prisma.visitadores.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new AppError("Visitor not found or update failed", 404);
    }
  }

  static async delete(id: string) {
    try {
      return await prisma.visitadores.delete({ where: { id } });
    } catch (error) {
      throw new AppError("Visitor not found or delete failed", 404);
    }
  }
}
