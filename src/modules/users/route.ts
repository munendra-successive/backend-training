import express from "express";
import { Controller } from ".";
import { Validation, Authentication } from "./middleware";


const router = express.Router();

router.route("/login").post(Authentication.authenticate, Controller.login);

router.route("/register").post(Validation.validate, Controller.register);

router.route("/find/:name").get(Controller.findByName);

router.route("/delete/:name").delete(Controller.deleteByName);

router.route("/update").patch(Controller.updateByName);

export default router;
