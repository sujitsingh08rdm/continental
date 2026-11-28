import { Hotel } from "../models/hotel.model";
import { Room } from "../models/room.model";

export const addRoom = async (payload: any) => {
  await Room.create(payload);
  return { message: "Room Registered" };
};

export const getOwnerRooms = async (id: string) => {
  // 1. Find hotels owned by the logged-in user
  const hotels = await Hotel.find({ owner: id }).select("_id");
  const hotelIds = hotels.map((hotel: any) => hotel._id);

  // 2. Find rooms belonging to those hotels
  const ownerRooms = await Room.find({
    hotel: { $in: hotelIds },
  }).populate({
    path: "hotel",
    select: "hotelName hotelAddress rating amenities",
  });

  return ownerRooms;
};

export const getAllRoom = async () => {
  const rooms = await Room.find()
    .populate({
      path: "hotel",
      select: "hotelName hotelAddress rating amenities owner",
      populate: { path: "owner", select: "name email" },
    })
    .exec();

  return rooms;
};

export const deleteRoom = async (roomId: string) => {
  await Room.findByIdAndDelete(roomId);
  return { message: "Room Deleted Success" };
};
