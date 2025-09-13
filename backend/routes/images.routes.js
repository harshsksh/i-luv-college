import express from "express";
import {
  addImageToCollege,
  checkUserLike,
  getCollegeImages,
  toggleLike,
} from "../controllers/images.controller.js";
import protectRoute from "../middlewares/ProtectRoute.js";

const ImageRouter = express.Router();

ImageRouter.post("/add/:collegeId", protectRoute, addImageToCollege);
ImageRouter.get("/allimages/:collegeId", getCollegeImages);
ImageRouter.post("/checklike/:imageId", checkUserLike);
ImageRouter.post("/togglelike/:imageId", protectRoute, toggleLike);

export default ImageRouter;
