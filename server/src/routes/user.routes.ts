import { Router } from "express";
import { isAuth, login, logout, signup } from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const UserRouter = Router();

UserRouter.post("/signup", signup);
UserRouter.post("/login", login);
UserRouter.get("/is-auth", AuthMiddleware, isAuth);
UserRouter.post("/logout", AuthMiddleware, logout);

export default UserRouter;
