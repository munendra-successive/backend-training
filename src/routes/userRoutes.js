import express from "express";
import { GetData, PostData, Login } from "../controllers/index.js";
import {
  validate,
  authenticate,
  queryValidator,
} from "../middlewares/index.js";
const router = express.Router();

router.route("/").get(authenticate, GetData);
router.route("/").post(authenticate, PostData);
router.route("/:query").get(queryValidator);
router.route("/login").post(validate, Login);

export default router;
