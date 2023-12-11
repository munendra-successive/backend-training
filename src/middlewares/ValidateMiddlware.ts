import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import httperror from "http-errors";
import JoiSchemaInstance from "../schemas/JoiSchema";
import { Schema } from "joi";

class ValidateMiddleware {
  secretKey: string;
  constructor() {
    this.secretKey = "myNameIsMunendraKumarKushwaha";
  }

  public validate(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.originalUrl);
      const mySchema: Schema | undefined = JoiSchemaInstance.userConfig(
        req.originalUrl
      );
      if (mySchema) {
        const { error } = mySchema.validate(req.body, { abortEarly: false });
        if (error) {
          throw error;
        }
      }
      next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return res.status(400).json(error.details);
    }
  }

  authenticate = (req: Request, res: Response, next: NextFunction) => {
    console.log("in authenticate");

    const token: string | undefined = req.header("authorization");
    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }
    try {
      console.log("in try block");

      const decoded: string | JwtPayload = jwt.verify(token, this.secretKey);
      req.body.user = decoded;
      console.log(req.body.user);
      next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  };

  public validateParam(req: Request, res: Response, next: NextFunction) {
    if (!isNaN(Number(req.params.id))) {
      res.send("Is a number");
    } else {
      next(httperror(400, "Not a number"));
    }
  }

  public queryValidator(req: Request, res: Response) {
    const query: string = req.query.age as string;
    if (!isNaN(Number(query))) {
      return res.send("Is a number");
    } else {
      return res.status(404).send("Not a number");
    }
  }
}
export default new ValidateMiddleware();
