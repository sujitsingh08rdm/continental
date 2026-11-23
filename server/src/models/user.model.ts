import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    role: {
      type: String,
      enum: ["owner", "user"],
      default: "user",
    },
    password: {
      type: String,
      minLength: [6, "Passowrd must be of 6 Character"],
      required: [true, "Password is required"],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 12);
});

const User = model("User", userSchema);
export default User;
