import express from "express";
import Controller from "./controller";
const router = express.Router();

router.route("/").post(Controller.add);

export default router;
