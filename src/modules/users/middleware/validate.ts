import { NextFunction, Request, Response } from "express";
import JoiSchema from "../schema/joiSchema.js";

class Validation {
  static validate = (req: Request, res: Response, next: NextFunction) => {
    const { error } = JoiSchema.register().validate(req.body, {
      abortEarly: false,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error)
      return res
        .status(400)
        .json({ message: "Validation error", details: error.details });
    next();
  };
}

export default Validation;
