import express from "express";
import { ValidateMiddlewareInstance } from "../middlewares/index.js";
import { UserControllerInstance } from "../controllers/index.js";

const router = express.Router();

router
  .route("/create")
  .post(ValidateMiddlewareInstance.validate, UserControllerInstance.addUser);

router
  .route("/login")
  .post(ValidateMiddlewareInstance.validate, UserControllerInstance.Login);

router.route("/query").get(ValidateMiddlewareInstance.queryValidator);

router.route("/:id").get(ValidateMiddlewareInstance.validateParam);

router.route("/country").post(UserControllerInstance.addCountry);

export default router;
