import { PaymentMethod } from "../enums/booking.enum";
import { Booking } from "../models/booking.model";
import { Hotel } from "../models/hotel.model";
import { Room } from "../models/room.model";
import { TryError } from "../utils/error";
import stripe from "stripe";

interface PopulatedHotel {
  _id: string;
  hotelName: string;
}

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

export const checkAvailablity = async (
  checkInDate: Date,
  checkOutDate: Date,
  room: string,
) => {
  const isAvailable = await checkAvailabilityForRoom(
    room,
    checkInDate,
    checkOutDate,
  );

  return isAvailable;
};

export const bookRoom = async (
  room: string,
  checkInDate: Date,
  checkOutDate: Date,
  id: string,
  persons: number,
  paymentMethod: PaymentMethod,
) => {
  const isAvailable = await checkAvailabilityForRoom(
    room,
    checkInDate,
    checkOutDate,
  );
  if (!isAvailable) {
    throw TryError("Room Not Available", 400);
  }

  const roomData = await Room.findById(room).populate<{
    hotel: PopulatedHotel;
  }>("hotel");

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
  return { message: `Room with Id (${room}) Booked` };
};

export const getUserBooking = async (id: string) => {
  const bookings = await Booking.find({ user: id })
    .populate("room")
    .populate("hotel")
    .sort({ createdAt: -1 });

  return bookings;
};

export const getHotelBookings = async (id: string) => {
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

  return bookings;
};

export const stripePayment = async (bookingId: string, origin: any) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw TryError("Booking Not Found", 404);
  }
  const roomData = await Room.findById(booking.room).populate<{
    hotel: PopulatedHotel;
  }>("hotel");

  if (!roomData) {
    throw TryError("Booking Not Found", 404);
  }

  const totalPrice = booking.totalPrice;

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
  return session;
};
