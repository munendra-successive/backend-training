import { Response, Request, NextFunction } from "express";

class ErrorMiddleware {
  // eslint-disable-next-line @typescript-eslint/ban-types
  public  asyncErrorHandler(func: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
      func(req, res, next)
        .then(() => res.status(200).send("No Error"))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => next(err));
    };
  }

  public  asyncThrowError() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject(new Error("Request Rejected"));
        resolve("No error");
      }, 1000);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  public  errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // const { status, message } = err;
    const status = err.status || 401;
    const message = err.message || err;
    res.status(status).json({ "Error message": message });
  }
}

export default new ErrorMiddleware();
