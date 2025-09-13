import express from "express";
import { createMailingListEntry } from "../controllers/mailinglist.controller.js";

const SubscribeRouter = express.Router();

SubscribeRouter.post("/subscribe", createMailingListEntry);

export default SubscribeRouter;
