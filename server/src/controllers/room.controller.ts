import { Request, Response } from "express";
import { Room } from "../models/room.model";
import { SessionInterface } from "../middlewares/auth.middleware";
import { CatchError, TryError } from "../utils/error";
import { Types } from "mongoose";
import { Hotel } from "../models/hotel.model";

interface HotelInterface {
  hotelName: string;
  hotelAddress: string;
  rating: number;
  amenities: string[];
  owner: Types.ObjectId;
}

// Add a new room
export const addRoom = async (req: Request, res: Response) => {
  try {
    const {
      roomType,
      hotel,
      pricePerNight,
      description,
      amenities,
      isAvailable,
    } = req.body;
    if (!Array.isArray(req.files) || req.files.length === 0) {
      throw TryError("Hotel image is required", 400);
    }
    const image = req.files.map((file) => file.filename);
    const payload = {
      roomType,
      hotel,
      pricePerNight,
      description,
      amenities,
      isAvailable,
      images: image,
    };

    await Room.create(payload);

    res.status(200).json({ message: "Room Added Successfully", success: true });
  } catch (error) {
    CatchError(error, res);
  }
};

export const getOwnerRooms = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.user) {
      throw TryError("Unauthorized", 401);
    }

    const { id } = req.user;
    // 1. Find hotels owned by the logged-in user
    const hotels = await Hotel.find({ owner: id }).select("_id");
    const hotelIds = hotels.map((hotel) => hotel._id);

    // 2. Find rooms belonging to those hotels
    const ownerRooms = await Room.find({
      hotel: { $in: hotelIds },
    }).populate({
      path: "hotel",
      select: "hotelName hotelAddress rating amenities",
    });

    console.log(ownerRooms);

    res
      .status(200)
      .json({ ownerRooms, success: true, message: "Owner Rooms Fetched" });
  } catch (error) {
    CatchError(error, res);
  }
};

export const getAllRooms = async (req: SessionInterface, res: Response) => {
  try {
    const rooms = await Room.find()
      .populate({
        path: "hotel",
        select: "hotelName hotelAddress rating amenities owner",
        populate: { path: "owner", select: "name email" },
      })
      .exec();

    res
      .status(200)
      .json({ rooms, success: true, message: "Owner Rooms Fetched" });
  } catch (error) {
    CatchError(error, res);
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const rooms = await Room.findByIdAndDelete(roomId);

    res.status(200).json({ rooms, success: true, message: "Rooms Fetched" });
  } catch (error) {
    CatchError(error, res);
  }
};
