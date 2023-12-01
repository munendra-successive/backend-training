import { NextFunction, Request, Response } from "express";
import { userConfig } from "../utils/config.js";
const validate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const a:number=10
    console.log(req.originalUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mySchema: any = userConfig(req.originalUrl);
    const { error } = mySchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw error;
    }
    next();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    return res.status(400).json(error.details);
  }
};

export default validate;
