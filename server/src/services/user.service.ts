import { ObjectId } from "mongoose";
import User from "../models/user.model";
import { TryError } from "../utils/error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface SignupInterface {
  name: string;
  email: string;
  password: string;
  role: "user" | "owner";
}

interface LoginInterface {
  email: string;
  password: string;
}

export const signup = async (body: SignupInterface) => {
  const { name, email, password, role } = body;
  if (!name || !email || !password || !role) {
    throw TryError("All Fields are Required", 400);
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw TryError("User already exists, Try with different email", 409);
  }
  await User.create({ name, email, password, role });
  return {
    message: "User Signup Success",
  };
};

export const login = async (body: LoginInterface) => {
  const { email, password } = body;
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
  return {
    token,
    message: "Login Successfull",
  };
};

export const isAuth = async (id: string) => {
  const user = await User.findById(id).select("-password");
  return user;
};
