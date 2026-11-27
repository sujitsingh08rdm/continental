import { Request, Response } from "express";
import { Hotel } from "../models/hotel.model";
import { CatchError, TryError } from "../utils/error";
import { SessionInterface } from "../middlewares/auth.middleware";
import * as HotelService from "../services/hotel.service";

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

    const result = await HotelService.registerHotel(payload);
    res.status(200).json({ ...result, success: true });
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
    const hotels = await HotelService.getOwnerHotel(id.toString());

    res
      .status(200)
      .json({ message: "Fetched All Hotels for Owner", hotels, success: true });
  } catch (error) {
    CatchError(error, res);
  }
};

export const getHotels = async (_req: Request, res: Response) => {
  try {
    const hotels = await HotelService.getHotels();
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
    const result = await HotelService.deleteHotel(hotelId.toString());

    res.status(200).json({ ...result, success: true });
  } catch (error) {
    CatchError(error, res);
  }
};
