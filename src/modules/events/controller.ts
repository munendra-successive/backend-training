import { Response, Request } from "express";
import Service from "./service";
import IEvent from "./entities/IEvent";

class Controller {
  public static add = async (req: Request, res: Response) => {
    try {
      const eventData: IEvent = req.body;
      await Service.addEvent(eventData);
      res.status(200).json({ msg: "Event added Successfully" });
    } catch (error) {
      console.log("Error in add event controller", error);
    }
  };
}

export default Controller;
