import { Response, Request, NextFunction } from "express";
const queryValidator = (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = req.query.age;
  if (!isNaN(query)) {
    res.send("Is a number");
    next();
  } else {
    res.status(404).send("Not a number");
  }
};

export default queryValidator;
