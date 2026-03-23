import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/app-error";
import { ZodError } from "zod";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[Error] ${err.message}`);
  if (err.stack) console.error(err.stack);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "fail",
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // Handle Prisma errors more specifically
  const prismaError = err as any;
  if (err.name === 'PrismaClientKnownRequestError' || prismaError.code) {
     let statusCode = 400;
     let message = "Database operation failed";

     if (prismaError.code === 'P2003') {
       message = "Foreign key constraint failed (check related IDs)";
     } else if (prismaError.code === 'P2025') {
       statusCode = 404;
       message = "Record not found";
     }

     return res.status(statusCode).json({
       status: "error",
       message,
       details: err.message
     });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong internally",
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};
