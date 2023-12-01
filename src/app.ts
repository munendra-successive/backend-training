import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { router, otherRouter } from "./routes/index.js";
import {
  errorHandler,
  geoLocation,
  Logger,
  rateLimit,
  addCustomHeader,
} from "./middlewares/index.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use(geoLocation, Logger, rateLimit, addCustomHeader);

app.use("/", otherRouter);

app.use("/users", router);

app.use("*", (req: Request, res: Response) => {
  res.status(404).send("URL not found");
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`listening on port: ${process.env.PORT}`);
});
