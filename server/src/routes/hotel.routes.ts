import { Router } from "express";
import {
  deleteHotel,
  getHotels,
  getOwnerHotels,
  registerHotel,
} from "../controllers/hotel.controller";
import { AuthMiddleware, isOwner } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const HotelRouter = Router();

HotelRouter.post(
  "/register",
  upload.single("image"),
  AuthMiddleware,
  isOwner,
  registerHotel,
);
HotelRouter.get("/get", AuthMiddleware, isOwner, getOwnerHotels);
HotelRouter.get("/get-all", getHotels);
HotelRouter.delete("/delete/:hotelId", AuthMiddleware, isOwner, deleteHotel);

export default HotelRouter;
