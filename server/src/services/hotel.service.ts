import { Hotel } from "../models/hotel.model";
import { TryError } from "../utils/error";

export const registerHotel = async (payload: any) => {
  const hotel = await Hotel.create(payload);
  return { message: "Hotel Registered", hotel };
};

export const getOwnerHotel = async (id: string) => {
  const hotels = await Hotel.find({ owner: id }).populate(
    "owner",
    "name email",
  );
  return hotels;
};

export const getHotels = async () => {
  const hotels = await Hotel.find().populate("owner", "name email");
  return hotels;
};

export const deleteHotel = async (hotelId: string) => {
  const hotel = await Hotel.findByIdAndDelete(hotelId);
  if (!hotel) {
    throw TryError("Hotel Does Not Exist", 404);
  }
  return { message: "Hotel Delete Successfully" };
};
