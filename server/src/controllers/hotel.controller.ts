import { Request, Response } from "express";
import { Hotel } from "../models/hotel.model";
import { CatchError, TryError } from "../utils/error";
import { SessionInterface } from "../middlewares/auth.middleware";

export const registerHotel = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.user) {
      throw TryError("Unauthorized", 401);
    }
    const { id } = req.user;
    const { hotelName, hotelAddress, rating, price, amenities } = req.body;
    if (!req.file) {
      throw TryError("Hotel image is required", 400);
    }
    const image = req.file.filename;

    if (!hotelName || !hotelAddress || !rating || !price || !amenities) {
      throw TryError("All fields required", 409);
    }
    const payload = {
      hotelName,
      hotelAddress,
      rating,
      price,
      amenities,
      image,
      owner: id,
    };

    const hotel = await Hotel.create(payload);
    res.status(200).json({ message: "Hotel Registered", hotel, success: true });
  } catch (error) {
    CatchError(error, res);
  }
};

export const getOwnerHotels = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.user) {
      throw TryError("Unauthorized", 401);
    }
    const { id } = req.user;
    const hotels = await Hotel.find({ owner: id }).populate(
      "owner",
      "name email",
    );

    res
      .status(200)
      .json({ message: "Fetched All Hotels for Owner", hotels, success: true });
  } catch (error) {
    CatchError(error, res);
  }
};

export const getHotels = async (_req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().populate("owner", "name email");
    res
      .status(200)
      .json({ message: "Fetched All Hotels", hotels, success: true });
  } catch (error) {
    CatchError(error, res);
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    const hotel = await Hotel.findByIdAndDelete(hotelId);
    if (!hotel) {
      throw TryError("Hotel Does Not Exist", 404);
    }

    res.status(200).json({ message: "Hotel Deleted", success: true });
  } catch (error) {
    CatchError(error, res);
  }
};
