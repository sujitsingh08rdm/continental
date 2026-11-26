import { Request, Response } from "express";
import { Booking } from "../models/booking.model";
import { CatchError, TryError } from "../utils/error";
import { SessionInterface } from "../middlewares/auth.middleware";
import { Room } from "../models/room.model";
import { Hotel } from "../models/hotel.model";
import stripe from "stripe";

export const checkAvailabilityForRoom = async (
  room: string,
  checkInDate: Date,
  checkOutDate: Date,
): Promise<boolean> => {
  if (checkInDate >= checkOutDate) {
    return false;
  }
  const booking = await Booking.findOne({
    room,
    checkIn: { $lt: checkOutDate },
    checkOut: { $gt: checkInDate },
  });

  return !booking;
};

export const checkAvailablity = async (req: Request, res: Response) => {
  try {
    const { checkInDate, checkOutDate, room } = req.body;
    if (checkInDate >= checkOutDate) {
      throw TryError("Check-out date must be after check-in date", 400);
    }
    const isAvailable = await checkAvailabilityForRoom(
      room,
      checkInDate,
      checkOutDate,
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

    console.log("room ->", room, "persons ->", persons);

    const isAvailable = await checkAvailabilityForRoom(
      room,
      checkInDate,
      checkOutDate,
    );
    if (!isAvailable) {
      throw TryError("Room Not Available", 400);
    }

    const roomData = await Room.findById(room).populate("hotel");
    if (!roomData) {
      throw TryError("Room Not Found", 404);
    }
    let totalPrice = roomData.pricePerNight;
    // totalPrice based on per night
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn >= checkOut) {
      throw TryError("Check-out date must be after check-in date", 400);
    }
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalPrice = totalPrice * nights;

    const payload = {
      user: id,
      room,
      hotel: roomData.hotel._id,
      checkIn,
      checkOut,
      persons,
      totalPrice,
      paymentMethod,
    };

    await Booking.create(payload);
    res.json({ success: true, message: "Room Booked Successfully" });
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
    const bookings = await Booking.find({ user: id })
      .populate("room")
      .populate("hotel")
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Booking Fetched for User", bookings, success: true });
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
    const hotels = await Hotel.find({ owner: id }).select("_id");
    if (!hotels) {
      throw TryError("Hotel Not Found", 404);
    }
    const hotelIds = hotels.map((hotel) => hotel._id);
    const bookings = await Booking.find({ hotel: { $in: hotelIds } })
      .populate("room hotel")
      .sort({ createdAt: -1 });

    if (bookings.length === 0) {
      throw TryError("Booking Not Found", 404);
    }

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
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw TryError("Booking Not Found", 404);
    }
    const roomData = await Room.findById(booking.room).populate("hotel");
    if (!roomData) {
      throw TryError("Booking Not Found", 404);
    }
    const totalPrice = booking.totalPrice;
    const { origin } = req.headers;

    const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY!);
    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: { name: roomData.hotel.hotelName },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      },
    ];
    //create checkout session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader/my-bookings`,
      cancel_url: `${origin}/my-booking`,
      metadata: { bookingId },
    });

    await booking.updateOne({ isPaid: true, status: "confirmed" });
    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    CatchError(error, res);
  }
};
