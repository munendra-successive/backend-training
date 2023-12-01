import { NextFunction,Request,Response } from "express";

// eslint-disable-next-line @typescript-eslint/ban-types
const asyncErrorHandler = (func:Function) => {
  return (req:Request, res:Response, next:NextFunction) => {
    func(req, res, next)
      .then(() => res.status(200).send("No Error"))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err:any) => next(err));
  };
};

const asyncThrowError = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject(new Error("Request Rejected"));
      resolve("No error");
    }, 1000);
  });
};

export { asyncErrorHandler, asyncThrowError };
