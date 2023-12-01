import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
const secretKey = "myNameIsMunendraKumarKushwaha";
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.header("authorization");
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decoded: JwtPayload = jwt.verify(token, secretKey) as JwtPayload;
    req.body.user = decoded;
    console.log(req.body.user);
    next();
  } catch (error: any) {
    error.status = 401;
    error.message = "JWT expired, You are unauthorized";
    next(error);
  }
};

export default authenticate;
