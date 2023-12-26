import { Router } from "express";
import Controller from "./controller";
import multer, { type Multer } from "multer";

const router: Router = Router();
const upload: Multer = multer({ dest: "uploads/" }); // Set destination folder for file uploads

router.route("/upload").post(upload.single("csvFile"), Controller.uploadCsv);

export { router };
