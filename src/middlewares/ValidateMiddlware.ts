import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httperror from "http-errors";

import { userConfig } from "../utils/config.js";
class ValidateMiddleware {
  secretKey: string;
  constructor() {
    this.secretKey = "myNameIsMunendraKumarKushwaha";
  }

  public validate(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.originalUrl);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mySchema: any = userConfig(req.originalUrl);
      const { error } = mySchema.validate(req.body, { abortEarly: false });
      if (error) {
        throw error;
      }
      next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return res.status(400).json(error.details);
    }
  }

  authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.header("authorization");
    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwt.verify(token, this.secretKey);
      req.body.user = decoded;
      console.log(req.body.user);
      next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      error.status = 401;
      error.message = "JWT expired, You are unauthorized";
      next(error);
    }
  };

  public validateParam(req: Request, res: Response, next: NextFunction) {
    if (!isNaN(Number(req.params.id))) {
      res.send("Is a number");
    } else {
      next(httperror(400, "Not a number"));
    }
  }

  public queryValidator(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = req.query.age;
    if (!isNaN(query)) {
      res.send("Is a number");
      next();
    } else {
      res.status(404).send("Not a number");
    }
  }
}
export default new ValidateMiddleware();
