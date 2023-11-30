import { NextFunction,Request,Response } from "express";

const asyncErrorHandler = (func:Function) => {
  return (req:Request, res:Response, next:NextFunction) => {
    func(req, res, next)
      .then(() => res.status(200).send("No Error"))
      .catch((err:any) => next(err));
  };
};

const asyncThrowError = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject(new Error("Request Rejected"));
      resolve("No error");
    }, 1000);
  });
};

export { asyncErrorHandler, asyncThrowError };
