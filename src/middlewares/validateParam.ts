import { Response, Request, NextFunction } from "express";
import httperror from "http-errors";
const validateParam = (req: Request, res: Response, next: NextFunction) => {
  if (!isNaN(Number(req.params.id))) {
    res.send("Is a number");
  } else {
    next(httperror(400, "Not a number"));
  }
};
export default validateParam;
