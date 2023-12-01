import { Response, Request, NextFunction } from "express";

const addCustomHeader = (req:Request, res:Response, next:NextFunction) => {
    res.setHeader("customHeader", "X-myCustomHeader");
    next();
  };
  export default addCustomHeader;