import express, { Application } from "express";
import dotenv from "dotenv";
import { ConnectionInstance } from "./lib/index.js";
import { router, otherRouter } from "./routes/index.js";
import { Response } from "express";

import {
  ErrorMiddlewareInstance,
  OtherMiddlewareInstance,
} from "./middlewares/index.js";

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
    // this.app.use(RateLimitMiddlewareInstance.rateLimit);
    this.app.use(OtherMiddlewareInstance.addCustomHeader);
  }

  routes() {
    this.app.use("/users", router);
    this.app.use("/async-error", otherRouter);
    this.app.use("/health-check", (res: Response) => {
      res.send("Health is ok").status(200);
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
