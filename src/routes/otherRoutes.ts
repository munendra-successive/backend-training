import express from "express";
import { NextFunction, Request,Response } from "express";

const otherRouter = express.Router();
import { asyncErrorHandler, asyncThrowError } from "../middlewares/index.js";
otherRouter.route("/async-error").get(
  asyncErrorHandler(async (req:Request, res:Response, next:NextFunction) => {
    await asyncThrowError();
  })
);

export default otherRouter;