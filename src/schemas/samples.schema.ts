import { z } from "zod";

export const idParamSchema = z.object({
    id: z.string().uuid("Invalid ID format (UUID expected)")
});

export const createSampleSchema = z.object({
    nombre: z.string().min(1, "Nombre is required"),
    existencias: z.coerce.number().int().nonnegative("Existencias must be a non-negative integer"),
    umbral_minimo: z.coerce.number().int().nonnegative("Umbral minimo must be a non-negative integer")
});

export const updateSampleSchema = z.object({
    nombre: z.string().min(1, "Nombre is required").optional(),
    existencias: z.coerce.number().int().nonnegative("Existencias must be a non-negative integer").optional(),
    umbral_minimo: z.coerce.number().int().nonnegative("Umbral minimo must be a non-negative integer").optional()
});
