import { NextFunction, Request, Response } from "express";
import { userConfig } from "../utils/config.js";
const validate = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.originalUrl);
    const mySchema: any = userConfig(req.originalUrl);
    const { error, value } = mySchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw error;
    }
    next();
  } catch (error:any) {
    return res.status(400).json(error.details);
  }
};

export default validate;
