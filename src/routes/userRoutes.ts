import express from "express";
import { Response, Request } from "express";
import { GetData, PostData, Login } from "../controllers/index.js";
import {
  validate,
  authenticate,
  validateParam,
  queryValidator,
} from "../middlewares/index.js";

const router = express.Router();

router.route("/").get(authenticate, GetData);

router.route("/").post(authenticate, PostData);

router.route("/query").get(queryValidator);

router.route("/:id").get(validateParam);

router.route("/login").post(validate, Login);


router.route("/register").post(validate, (req: Request, res: Response) => {
  res.send("Data Saved Successfully");
});

export default router;
