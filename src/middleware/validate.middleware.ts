import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validate = (schema: z.ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: error.issues.map((issue) => ({
                        path: issue.path.join('.'),
                        message: issue.message
                    }))
                });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    };
};
