import express, { NextFunction,Request, Response } from "express";
import Error from './controllers/entities/Error'
import { router, otherRouter } from "./routes/index.js";
const app = express();

app.use(express.json());
// app.use("/", otherRouter);
app.use("/users", router);
// app.use("*", (req, res) => {
//   res.status(404).send("URL not found");
// });

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  res.status(401).send("Error Occured");
});
app.listen(8000, () => {
  console.log("listening on port: 8000");
});
