import dotenv from "dotenv";
dotenv.config();

/* DB Connection */
import mongoose from "mongoose";
mongoose
  .connect(process.env.DB_URL!)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log("Error Connecting to DB", err.message));

/* express setup */
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.routes";
import HotelRouter from "./routes/hotel.routes";
import RoomRouter from "./routes/room.routes";
import BookingRouter from "./routes/booking.routes";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Endpoints */
app.get("/api/health", (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Endpoing is Running...", service: "Health Check" });
});
app.use("/images", express.static("uploads"));
app.use("/api/auth", UserRouter);
app.use("/api/hotel", HotelRouter);
app.use("/api/room", RoomRouter);
app.use("/api/booking", BookingRouter);

/* Server */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Continental Server is Running fine on PORT ${PORT}`);
});
