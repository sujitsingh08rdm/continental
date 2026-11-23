import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CatchError, TryError } from "../utils/error";
import { Types } from "mongoose";

export interface SessionInterface extends Request {
  user?: { id: Types.ObjectId | string; role: string };
}

export const AuthMiddleware = (
  req: SessionInterface,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw TryError("Unauthorized", 401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    CatchError(error, res);
  }
};

export const isOwner = (
  req: SessionInterface,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.user && req.user.role === "owner") {
      next();
    } else {
      throw TryError("Unauthorized", 401);
    }
  } catch (error) {
    CatchError(error, res);
  }
};
