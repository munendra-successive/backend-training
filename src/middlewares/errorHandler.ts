import { Response,Request,NextFunction } from "express";
const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    // const { status, message } = err;
    const status = err.status || 401
    const message=err.message || err
    res.status(status).json({"Error message":message});
  };
  export default errorHandler;