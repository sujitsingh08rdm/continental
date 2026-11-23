import { Response } from "express";

interface ErrorMessage extends Error {
  statusCode?: number;
}

export const TryError = (message: string, code: number = 500) => {
  const err: ErrorMessage = new Error(message);
  err.statusCode = code;
  return err;
};

export const CatchError = (
  error: unknown,
  res: Response,
  prodMessage: string = "Internal Server Error",
) => {
  if (error instanceof Error) {
    const message =
      process.env.NODE_ENV === "dev" ? error.message : prodMessage;
    const status = (error as ErrorMessage).statusCode || 500;
    res.status(status).json({ message, success: false });
  }
};
