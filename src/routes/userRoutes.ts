import express from "express";
import { Response, Request } from "express";
import { ValidateMiddlewareInstance } from "../middlewares/index.js";
import { UserControllerInstance } from "../controllers/index.js";

const router = express.Router();

router
  .route("/")
  .get(ValidateMiddlewareInstance.authenticate, UserControllerInstance.GetData);

router
  .route("/")
  .post(
    ValidateMiddlewareInstance.authenticate,
    UserControllerInstance.PostData
  );

router.route("/query").get(ValidateMiddlewareInstance.queryValidator);

router.route("/:id").get(ValidateMiddlewareInstance.validateParam);

router.route("/country").post(UserControllerInstance.addCountry);

router
  .route("/create")
  .post(ValidateMiddlewareInstance.validate, UserControllerInstance.addUser);

router
  .route("/login")
  .post(ValidateMiddlewareInstance.validate, UserControllerInstance.Login);

router
  .route("/register")
  .post(ValidateMiddlewareInstance.validate, (req: Request, res: Response) => {
    res.send("Data Saved Successfully");
  });

export default router;
