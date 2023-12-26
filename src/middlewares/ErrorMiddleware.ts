import { type Response, type Request, type NextFunction } from "express";
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

class ErrorMiddleware {
  public asyncErrorHandler(func: AsyncRequestHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
      func(req, res, next)
        .then(() => res.status(200).send("No Error"))
        .catch((err: any) => {
          next(err);
        });
    };
  }

  public async asyncThrowError(): Promise<any> {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("No error");
      }, 1000);
    });
  }

  public errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    // const { status, message } = err;
    const status: number = err.status || 401;
    const message: any = err.message || err;
    res.status(status).json({ "Error message": message });
  };
}

export default new ErrorMiddleware();
