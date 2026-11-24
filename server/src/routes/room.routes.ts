import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { AuthMiddleware, isOwner } from "../middlewares/auth.middleware";
import {
  addRoom,
  deleteRoom,
  getAllRooms,
  getOwnerRooms,
} from "../controllers/room.controller";

const RoomRouter = Router();

RoomRouter.post(
  "/add",
  upload.array("images"),
  AuthMiddleware,
  isOwner,
  addRoom,
);
RoomRouter.get("/get", AuthMiddleware, isOwner, getOwnerRooms);
RoomRouter.get("/get-all", getAllRooms);
RoomRouter.delete("/delete/:roomId", AuthMiddleware, deleteRoom);

export default RoomRouter;
