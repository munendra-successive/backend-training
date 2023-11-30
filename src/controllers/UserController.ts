import jwt from "jsonwebtoken";
import { NextFunction, Request,Response } from "express";

const PostData = (req:Request, res:Response) => {
  const data = req.body;
  console.log(data);
  res.send("Data Posted Successfully")
};

const GetData = (req:Request, res:Response,next:NextFunction) => {
  try{
  res.json([
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
    },
  ]);}
  catch(err){
    next(err)
  }
};
const secretKey = "myNameIsMunendraKumarKushwaha";
const Login = (req:Request, res:Response) => {
  const user = { id: 1, name: "monu" };
  jwt.sign(user, secretKey, { expiresIn: "30m" }, (err, token) => {
    res.json({ token });
  });
};

export { GetData, PostData, Login };
