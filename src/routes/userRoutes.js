import express from "express";
import {GetData,PostData,Login} from '../controllers/index.js'
import {validate,authenticate} from '../middlewares/index.js'
const router = express.Router();


router.route("/users").get(authenticate, GetData);
router.route("/users").post(authenticate, PostData);
router.route("/login").post(validate,Login);

export default router;
