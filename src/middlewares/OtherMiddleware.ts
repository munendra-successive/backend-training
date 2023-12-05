import { Response, Request, NextFunction } from "express";
import { SuperfaceClient } from "@superfaceai/one-sdk";

class OtherMiddleware {
  private sdk = new SuperfaceClient();

  constructor() {
    this.addCustomHeader = this.addCustomHeader.bind(this);
    this.run = this.run.bind(this);
    this.geoLocation = this.geoLocation.bind(this);
    this.Logger = this.Logger.bind(this);
  }

  public addCustomHeader(req: Request, res: Response, next: NextFunction) {
    res.setHeader("customHeader", "X-myCustomHeader");
    next();
  }

  public async run(ip: string) {
    const profile = await this.sdk.getProfile("address/ip-geolocation@1.0.1");
    const result = await profile.getUseCase("IpGeolocation").perform(
      {
        ipAddress: ip,
      },
      {
        provider: "ipdata",
        security: {
          apikey: {
            apikey: "9a511b6fc8334e1852cfbbd4ff3f1af3c42ed6abc75e96a1648b969a",
          },
        },
      }
    );

    try {
      const data = result.unwrap();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  public async geoLocation(req: Request, res: Response, next: NextFunction) {
    //   const ip = "45.249.87.217";
    //   const ip = "42.108.5.67";
    const ip: string = "45.249.87.217";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await this.run(ip);
      if (response.addressRegion !== "Delhi") {
        return res.status(403).send("User is not from the expected region");
      }
      console.log("user from expected region");
      next();
    } catch (error) {
      console.log(error);
    }
  }

  public Logger(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Method is ${req.method}, Urls is ${
        req.originalUrl
      } and TimeStamp is: ${new Date().toLocaleString()}`
    );
    next();
  }
}

export default new OtherMiddleware();
