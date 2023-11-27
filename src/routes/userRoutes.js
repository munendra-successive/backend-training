import express from "express";
import jwt from "jsonwebtoken";
import { GetData, PostData } from "../controllers/UserController.js";
import { addCustomHeader, rateLimit } from "../MiddleWares/index.js";
const router = express.Router();
const secretKey = "myNameIsMunendraKumarKushwaha";
const authenticate = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

router.route("/").get(authenticate, addCustomHeader, GetData);
router.route("/").post(authenticate, addCustomHeader, PostData);
router.post("/login", (req, res) => {
  const user = { id: 1, name: "monu" };
  jwt.sign(user, secretKey, { expiresIn: "30m" }, (err, token) => {
    res.json({ token });
  });
});

export default router;
