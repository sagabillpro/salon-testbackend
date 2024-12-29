import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default to 500 Internal Server Error if no status code is provided
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Something went wrong!";

  // Build a response object with error details
  const errorResponse = {
    success: false,
    message,
    ...(err.errors && { errors: err.errors }),       // Additional errors for validation cases
    ...(process.env.NODE_ENV === "development" && {   // Stack trace for debugging in development
      stack: err.stack
    })
  };

  res.status(statusCode).json(errorResponse);
};

// Usage: Attach this middleware in Express app
// app.use(errorHandler);
