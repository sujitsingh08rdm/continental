import { model, Schema, Types } from "mongoose";

const hotelSchema = new Schema(
  {
    owner: { type: Types.ObjectId, ref: "User", required: true },
    hotelName: { type: String, required: [true, "Hotel name is required"] },
    hotelAddress: {
      type: String,
      required: [true, "Hotel Address is required"],
    },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    amenities: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

export const Hotel = model("Hotel", hotelSchema);
