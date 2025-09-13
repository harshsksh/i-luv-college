import express from "express";

import protectRoute from "../middlewares/ProtectRoute.js";
import {
  AllColleges,
  SingleCollege,
  checkUserLikeCollege,
  createCollege,
  toggleCollegeLike,
} from "../controllers/colleges.controller.js";

const CollegeRouter = express.Router();

CollegeRouter.post("/addnew", protectRoute, createCollege);
CollegeRouter.post("/checklike/:collegeId", protectRoute, checkUserLikeCollege);
CollegeRouter.post("/togglelike/:collegeId", protectRoute, toggleCollegeLike);

CollegeRouter.get("/getall", AllColleges);
CollegeRouter.get("/single/:id", SingleCollege);

export default CollegeRouter;
