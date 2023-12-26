import jwt from "jsonwebtoken";
import { seedData } from "../utils/index.js";

// PostData
const PostData = (req, res) => {
  const data = req.body;
  console.log(data);
  return res.status(200).json({ message: "Data added successfully" });
};

//GetData
const GetData = (req, res) => {
  res.json({ "Data: ": seedData });
};
const secretKey = "myNameIsMunendraKumarKushwaha";

// Login
const Login = (req, res) => {
  const user = { id: 1, name: "monu" };
  jwt.sign(user, secretKey, { expiresIn: "30m" }, (err, token) => {
    res.json({ token });
  });
};

export { GetData, PostData, Login };
