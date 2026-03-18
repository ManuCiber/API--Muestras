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

  // Handle Prisma errors (optional but recommended)
  if (err.name === 'PrismaClientKnownRequestError') {
     return res.status(400).json({
       status: "error",
       message: "Database operation failed",
       details: err.message
     });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong internally",
  });
};
