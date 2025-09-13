import express from "express";
import {
  allUsers,
  login,
  logout,
  signup,
} from "../controllers/users.controller.js";
import protectRoute from "../middlewares/ProtectRoute.js";

const UserRouter = express.Router();

UserRouter.post("/signup", signup);
UserRouter.post("/login", login);
UserRouter.get("/logout", logout);
UserRouter.get("/getall", protectRoute, allUsers);

export default UserRouter;
