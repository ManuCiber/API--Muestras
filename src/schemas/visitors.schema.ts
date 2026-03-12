import { z } from "zod";

export const createVisitorSchema = z.object({
    nombre: z.string().min(1, "Nombre is required"),
    apellido: z.string().min(1, "Apellido is required"),
    zona: z.string().min(1, "Zona is required"),
    muestras_asignadas: z.number().int().nonnegative("Muestras asignadas must be a non-negative integer")
});

export const updateVisitorSchema = z.object({
    nombre: z.string().min(1, "Nombre is required").optional(),
    apellido: z.string().min(1, "Apellido is required").optional(),
    zona: z.string().min(1, "Zona is required").optional(),
    muestras_asignadas: z.number().int().nonnegative("Muestras asignadas must be a non-negative integer").optional()
});
