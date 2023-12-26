import { Router } from "express";
import { Controller } from "./controller";
import { Validation, Authentication } from "./middleware";

const router: Router = Router();
const controllerInstance: Controller = new Controller();

router
  .route("/login")
  .post(Authentication.authenticate, controllerInstance.login);

router
  .route("/register")
  .post(Validation.validate, controllerInstance.register);

router.route("/find/:name").get(controllerInstance.findByName);

router.route("/delete/:name").delete(controllerInstance.deleteByName);

router.route("/update").patch(controllerInstance.updateByName);

export default router;
