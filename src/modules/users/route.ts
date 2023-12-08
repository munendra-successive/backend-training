import express from "express";
import Controller from "./controller";
const router = express.Router();

router.route("/login").post(Controller.Login);

router.route("/register").post();

export default router;
