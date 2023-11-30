import userSchema from "../schema.js";
import { NextFunction, Request,Response } from "express";
const validate = (req:Request, res:Response, next:NextFunction) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    console.log("Error Occured:", error.details[0].message);
    return res.status(400).send({
      status:false,
      message: "Data is Not Valid",
      error
    })
    
  } else {
    console.log(value);
    next();
  }
};

export default validate;
