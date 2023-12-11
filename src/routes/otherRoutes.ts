import express from "express";
import { NextFunction, Request, Response } from "express";
import { ErrorMiddlewareInstance } from "../middlewares";
const otherRouter = express.Router();
otherRouter.route("/").get(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ErrorMiddlewareInstance.asyncErrorHandler(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (req: Request, res: Response, next: NextFunction) => {
      await ErrorMiddlewareInstance.asyncThrowError();
    }
  )
);

export default otherRouter;
