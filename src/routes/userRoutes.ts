import express from "express";
import { NextFunction, Request,Response } from "express";

import { GetData, PostData, Login } from "../controllers/index.js";
import {
  validate,
  authenticate,
  asyncErrorHandler,
  asyncThrowError,
} from "../middlewares/index.js";
import httperror from "http-errors";
const router = express.Router();

router.route("/").get(authenticate, GetData);
router.route("/").post(authenticate, PostData);

router.route("/:id").get((req:Request, res:Response, next:NextFunction) => {
  if (!isNaN(Number(req.params.id))) {
    res.send("Is a number");
  } else {
    next(httperror(400, "Not a number"));
  }
});

router.route("/login").post(validate, Login);

export default router;
