import { z } from "zod";

export const idParamSchema = z.object({
    id: z.string().uuid("Invalid ID format (UUID expected)")
});

export const createVisitorSchema = z.object({
    nombre: z.string().min(1, "Nombre is required"),
    zona: z.string().min(1, "Zona is required"),
    muestras_asignadas: z.number().int().nonnegative("Muestras asignadas must be a non-negative integer")
});

export const updateVisitorSchema = z.object({
    nombre: z.string().min(1, "Nombre is required").optional(),
    zona: z.string().min(1, "Zona is required").optional(),
    muestras_asignadas: z.number().int().nonnegative("Muestras asignadas must be a non-negative integer").optional()
});
