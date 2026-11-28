import { Request, Response } from "express";
import { Room } from "../models/room.model";
import { SessionInterface } from "../middlewares/auth.middleware";
import { CatchError, TryError } from "../utils/error";
import * as RoomService from "../services/room.service";

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

    const result = await RoomService.addRoom(payload);

    res.status(200).json({ ...result, success: true });
  } catch (error) {
    CatchError(error, res);
  }
};

// get owner room
export const getOwnerRooms = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.user) {
      throw TryError("Unauthorized", 401);
    }
    const { id } = req.user;
    const ownerRooms = await RoomService.getOwnerRooms(id.toString());

    res
      .status(200)
      .json({ ownerRooms, success: true, message: "Owner Rooms Fetched" });
  } catch (error) {
    CatchError(error, res);
  }
};

// get all room
export const getAllRooms = async (_req: Request, res: Response) => {
  try {
    const rooms = await RoomService.getAllRoom();
    res
      .status(200)
      .json({ rooms, success: true, message: "Owner Rooms Fetched" });
  } catch (error) {
    CatchError(error, res);
  }
};

// delete room
export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const result = await RoomService.deleteRoom(roomId.toString());

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    CatchError(error, res);
  }
};
