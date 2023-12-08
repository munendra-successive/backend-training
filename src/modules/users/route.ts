import express from "express";
import Controller from "./controller";
const router = express.Router();

router.route("/login").post(Controller.login);

router.route("/register").post(Controller.register);

export default router;
