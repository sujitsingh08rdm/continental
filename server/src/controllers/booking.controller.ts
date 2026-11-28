import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import { SessionInterface } from "../middlewares/auth.middleware";
import * as BookingService from "../services/booking.service";

export const checkAvailablity = async (req: Request, res: Response) => {
  try {
    const { checkInDate, checkOutDate, room } = req.body;
    if (checkInDate >= checkOutDate) {
      throw TryError("Check-out date must be after check-in date", 400);
    }

    const isAvailable = await BookingService.checkAvailablity(
      checkInDate,
      checkOutDate,
      room,
    );

    res.status(200).json({
      success: true,
      isAvailable,
      message: isAvailable ? "Room Available" : "Room Not Available",
    });
  } catch (error) {
    CatchError(error, res);
  }
};

export const bookRoom = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.user) {
      throw TryError("Unauthorized", 401);
    }
    const { id } = req.user;
    const { persons, room, checkInDate, checkOutDate, paymentMethod } =
      req.body;

    const result = await BookingService.bookRoom(
      room,
      checkInDate,
      checkOutDate,
      id.toString(),
      persons,
      paymentMethod,
    );

    res.json({ success: true, ...result });
  } catch (error) {
    CatchError(error, res);
  }
};

export const getUserBooking = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.user) {
      throw TryError("Unauthorized", 401);
    }
    const { id } = req.user;
    const bookings = await BookingService.getUserBooking(id.toString());

    res
      .status(200)
      .json({ bookings, message: "Booking Fetched for User", success: true });
  } catch (error) {
    CatchError(error, res);
  }
};

export const getHotelBookings = async (
  req: SessionInterface,
  res: Response,
) => {
  try {
    if (!req.user) {
      throw TryError("Unauthorized", 401);
    }
    const { id } = req.user;
    const bookings = await BookingService.getHotelBookings(id.toString());

    res.json({
      message: "Bookings fetched for Hotel",
      bookings,
      success: true,
    });
  } catch (error) {
    CatchError(error, res);
  }
};

export const stripePayment = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;
    const { origin } = req.headers;

    const session = await BookingService.stripePayment(bookingId, origin);

    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    CatchError(error, res);
  }
};
