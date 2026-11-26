import { Router } from "express";
import { AuthMiddleware, isOwner } from "../middlewares/auth.middleware";
import {
  getHotelBookings,
  bookRoom,
  checkAvailablity,
  getUserBooking,
  stripePayment,
} from "../controllers/booking.controller";

const BookingRouter = Router();

BookingRouter.post("/check-availibity", checkAvailablity);
BookingRouter.post("/book-room", AuthMiddleware, bookRoom);
BookingRouter.get("/user", AuthMiddleware, getUserBooking);
BookingRouter.get("/hotel", AuthMiddleware, isOwner, getHotelBookings);
BookingRouter.post("/stripe-payment", AuthMiddleware, stripePayment);

export default BookingRouter;
