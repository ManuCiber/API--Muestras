import { z } from "zod";

export const idParamSchema = z.object({
    id: z.string().uuid("Invalid ID format (UUID expected)")
});

export const createDeliverySchema = z.object({
    muestra_id: z.string().uuid("muestra_id must be a valid UUID"),
    visitador_id: z.string().uuid("visitador_id must be a valid UUID"),
    cantidad: z.number().int().positive("cantidad must be at least 1"),
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)").optional(),
    hora: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Invalid time format (HH:MM:SS)").optional(),
    estado: z.string().optional()
});
