import express from "express";
import { GetData, PostData, Login } from "../controllers/index.js";
import {
  validate,
  authenticate,
  queryValidator,
} from "../middlewares/index.js";
const router = express.Router();

//user get route
router.route("/").get(authenticate, GetData);

// user post route
router.route("/").post(authenticate, PostData);

// user/:id route
router.route("/:query").get(queryValidator);

// user/login route
router.route("/login").post(validate, Login);

// user/register route
router.route("/register").post(validate, (req, res) => {
  res.send("Data Saved Successfully");
});

export default router;
