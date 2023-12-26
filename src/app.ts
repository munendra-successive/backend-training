import express, { type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Connection as ConnectionInstance } from "./lib";
import { router as userRouter } from "./modules/users";
import { router as eventRouter } from "./modules/events";
import { router as bulkRouter } from "./modules/bulkupload/route";

import {
  ErrorMiddlewareInstance,
  OtherMiddlewareInstance,
} from "./middlewares";

import { serverConfig } from "./config.js";
class Server {
  private readonly app: express.Application;
  constructor() {
    dotenv.config();
    this.app = express();

    // this.bootstrap = this.bootstrap.bind(this); // for normal functions
  }

  async bootstrap(): Promise<void> {
    await this.configure();
    this.routes();
  }

  async configure(): Promise<void> {
    await ConnectionInstance.connectDb();
    dotenv.config();
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,PATCH",
        allowedHeaders: "Content-Type",
        optionsSuccessStatus: 200,
      }),
    );
    // this.app.use(OtherMiddlewareInstance.geoLocation);
    this.app.use(OtherMiddlewareInstance.Logger);
    this.app.use(OtherMiddlewareInstance.addCustomHeader);
  }

  routes(): void {
    this.app.use("/users", userRouter);
    this.app.use("/events", eventRouter);
    this.app.use("/bulk", bulkRouter);
    this.app.use("/health-check", (res: Response) => {
      res.send("Health is ok").status(200);
    });

    this.app.use("*", (req, res) => {
      res.status(404).send("URL not found");
    });
    this.app.use(ErrorMiddlewareInstance.errorHandler);
  }

  public start(): void {
    this.app.listen(serverConfig.PORT, () => {
      console.log(`listening on port: ${serverConfig.PORT}`);
    });
  }
}
export default Server;
