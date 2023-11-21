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

  export default authenticate;