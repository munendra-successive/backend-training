import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class Authentication {
  private static secretKey = "myNameIsMunendraKumarKushwaha";

  static authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("authorization");
    if (!token) {
      return next();
    }
    try {
      const decoded = jwt.verify(token, Authentication.secretKey);
      return res
        .status(200)
        .json({ message: "Login Successful", details: decoded });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return next();
      }
      return res.status(403).json({ message: error });
    }
  };
}

export default Authentication;
