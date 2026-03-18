import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validate = (schema: z.ZodSchema, source: 'body' | 'params' | 'query' = 'body') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await schema.parseAsync(req[source]);
            
            // If it's params or query, we might want to override with the transformed values (like string to number)
            if (source !== 'body') {
                (req as any)[source] = data;
            }
            
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: `Validation failed in ${source}`,
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
