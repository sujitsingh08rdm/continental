import { model, Schema, Types } from "mongoose";

const roomSchema = new Schema(
  {
    hotel: { type: Types.ObjectId, ref: "Hotel", required: true },
    roomType: { type: String, required: [true, "Room type is required"] },
    pricePerNight: {
      type: Number,
      required: [true, "Price is Mandatory"],
    },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    amenities: { type: String, required: true },
    isAvailable: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export const Room = model("Room", roomSchema);
