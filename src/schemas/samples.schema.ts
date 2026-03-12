import { z } from "zod";

export const createSampleSchema = z.object({
    nombre: z.string().min(1, "Nombre is required"),
    descripcion: z.string().min(1, "Descripcion is required"),
    existencias: z.number().int().nonnegative("Existencias must be a non-negative integer")
});

export const updateSampleSchema = z.object({
    nombre: z.string().min(1, "Nombre is required").optional(),
    descripcion: z.string().min(1, "Descripcion is required").optional(),
    existencias: z.number().int().nonnegative("Existencias must be a non-negative integer").optional()
});
