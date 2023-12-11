import jwt from "jsonwebtoken";
const secretKey = "myNameIsMunendraKumarKushwaha";
const authenticate = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

export default authenticate;
