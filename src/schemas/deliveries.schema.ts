import { z } from "zod";

export const createDeliverySchema = z.object({
    muestras_id: z.number().int().positive("muestras_id is required"),
    visitadores_id: z.number().int().positive("visitadores_id is required"),
    cantidad: z.number().int().positive("cantidad must be at least 1")
});
