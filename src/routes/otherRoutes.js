import express from "express";
const otherRouter = express.Router();
import { asyncErrorHandler, asyncThrowError } from "../middlewares/index.js";
otherRouter.route("/async-error").get(
  asyncErrorHandler(async (req, res, next) => {
    await asyncThrowError();
  })
);

export default otherRouter;
