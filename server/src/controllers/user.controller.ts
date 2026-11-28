import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import User from "../models/user.model";

import { SessionInterface } from "../middlewares/auth.middleware";
import * as UserService from "../services/user.service";

/* Login */
export const signup = async (req: Request, res: Response) => {
  try {
    const result = await UserService.signup(req.body);
    res.json({ ...result, success: true });
  } catch (error) {
    CatchError(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await UserService.login(req.body);
    res.cookie("token", result.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ message: result.message, success: true });
  } catch (error) {
    CatchError(error, res);
  }
};

export const logout = (_req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Logout successfully", success: true });
  } catch (error) {
    CatchError(error, res);
  }
};

export const isAuth = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.user) {
      throw TryError("Unauthorized", 401);
    }
    const { id } = req.user;
    const user = await UserService.isAuth(id.toString());
    if (!user) {
      throw TryError("User Not Found", 404);
    }
    res.json({ success: true, user });
  } catch (error) {
    CatchError(error, res);
  }
};
