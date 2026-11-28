import { model, Schema, Types } from "mongoose";
import { PaymentMethod, PaymentStatus } from "../enums/booking.enum";

const bookingSchema = new Schema(
  {
    user: { type: Types.ObjectId, required: true, ref: "User" },
    hotel: { type: Types.ObjectId, required: true, ref: "Hotel" },
    room: { type: Types.ObjectId, required: true, ref: "Room" },
    persons: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    paymentMethod: { type: String, enum: Object.values(PaymentMethod) },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const Booking = model("Booking", bookingSchema);
