import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SessionInterface } from "../middlewares/auth.middleware";

/* Login */
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      throw TryError("All Fields are Required", 400);
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw TryError("User already exists, Try with different email", 409);
    }
    await User.create({ name, email, password, role });
    res.json({ message: "User Signup Success", success: true });
  } catch (error) {
    CatchError(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw TryError("Email and password required", 400);
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw TryError("Invalid Credentials", 404);
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw TryError("Invalid Credentials", 401);
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ message: "Login Successfull", success: true, user });
  } catch (error) {
    CatchError(error, res);
  }
};

export const logout = (req: Request, res: Response) => {
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
    const user = await User.findById(id).select("-password");

    res.json({ success: true, user });
  } catch (error) {
    CatchError(error, res);
  }
};
