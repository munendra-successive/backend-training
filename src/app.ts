import express, { Application } from "express";
import dotenv from "dotenv";
import { Connection as ConnectionInstance } from "./lib";
import { Response } from "express";
import { router as userRouter } from "./modules/users";
import { router as eventRouter } from "./modules/events";

import {
  ErrorMiddlewareInstance,
  OtherMiddlewareInstance,
} from "./middlewares";

import { serverConfig } from "./config.js";
class Server {
  private app: Application;
  constructor() {
    dotenv.config();
    this.app = express();
    this.configure();
    this.routes();
  }

  configure() {
    ConnectionInstance.connectDb();
    dotenv.config();
    this.app.use(express.json());
    this.app.use(OtherMiddlewareInstance.geoLocation);
    this.app.use(OtherMiddlewareInstance.Logger);
    this.app.use(OtherMiddlewareInstance.addCustomHeader);
  }

  routes() {
    this.app.use("/users", userRouter);
    this.app.use("/events", eventRouter);
    this.app.use("/health-check", (res: Response) => {
      res.send("Health is ok").status(200);
    });

    this.app.use("*", (req, res) => {
      res.status(404).send("URL not found");
    });
    this.app.use(ErrorMiddlewareInstance.errorHandler);
  }

  public start() {
    this.app.listen(serverConfig.PORT, () => {
      console.log(`listening on port: ${serverConfig.PORT}`);
    });
  }
}
export default Server;
