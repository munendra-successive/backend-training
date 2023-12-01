import { Response, Request, NextFunction } from "express";
const Logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `Method is ${req.method}, Urls is ${
      req.url
    } and TimeStamp is: ${new Date().toLocaleString()}`
  );
  next();
};

export default Logger;
