import express from "express";
import jwt from "jsonwebtoken";
import { GetData, PostData } from "../controllers/userController.js";
import { addCustomHeader, authenticate } from "../middleWares/index.js";
const router = express.Router();

router.route("/").get(authenticate, addCustomHeader, GetData);
router.route("/").post(authenticate, addCustomHeader, PostData);

const secretKey = "myNameIsMunendraKumarKushwaha";

router.post("/login", (req, res) => {
  const user = { id: 1, name: "monu" };
  try {
    jwt.sign(user, secretKey, { expiresIn: "30m" }, (err, token) => {
      res.status(200).json({ token });
    });
  } catch (error) {
    error.message = "Error in generation of token";
    err.status = 400;
    next(error);
  }
});

export default router;
