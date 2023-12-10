import express from "express";
import { Controller } from ".";

const router = express.Router();

router.route("/create").post(Controller.add);

router.route("/get").get(Controller.getLimit);

router.route("/getall").get(Controller.getAll);

router.route("/find/:type").get(Controller.getByType);

router.route("/delete/:status").delete(Controller.deleteByStatus);

router.route("/update").patch(Controller.updateStatus);

router.route("/count").get(Controller.countEvents);

router.route("deleteall").delete(Controller.deleteAll);

export default router;
