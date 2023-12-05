import { Response, Request, NextFunction } from "express";
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

class ErrorMiddleware {
  public asyncErrorHandler(func: AsyncRequestHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
      func(req, res, next)
        .then(() => res.status(200).send("No Error"))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => next(err));
    };
  }

  public asyncThrowError() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject(new Error("Request Rejected"));
        resolve("No error");
      }, 1000);
    });
  }

  public errorHandler(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    req: Request,
    res: Response
  ) {
    // const { status, message } = err;
    const status = err.status || 401;
    const message = err.message || err;
    res.status(status).json({ "Error message": message });
  }
}

export default new ErrorMiddleware();
