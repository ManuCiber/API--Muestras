import { prisma } from "../lib/prisma";
import { AppError } from "../lib/app-error";

export class SamplesService {
  static async getAll() {
    return await prisma.muestras.findMany();
  }

  static async getById(id: string) {
    const sample = await prisma.muestras.findUnique({ where: { id } });
    if (!sample) throw new AppError("Sample not found", 404);
    return sample;
  }

  static async create(data: { nombre: string; existencias: number; umbral_minimo: number }) {
    return await prisma.muestras.create({ data });
  }

  static async update(id: string, data: Partial<{ nombre: string; existencias: number; umbral_minimo: number }>) {
    try {
      return await prisma.muestras.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new AppError("Sample not found or update failed", 404);
    }
  }

  static async delete(id: string) {
    try {
      return await prisma.muestras.delete({ where: { id } });
    } catch (error) {
      throw new AppError("Sample not found or delete failed", 404);
    }
  }
}
