import { Response, Request } from "express";
import { Service } from "./index.js";
import { IEvent } from "./entities";

class Controller {
  static async getAll(req: Request, res: Response) {
    try {
      const data = await Service.getAll();
      return res.status(200).json({ "Data is:": data });
    } catch (error) {
      return res.status(400).json({ "Error Occurred": error });
    }
  }
  public static add = async (req: Request, res: Response) => {
    try {
      const eventData: IEvent = req.body;
      await Service.add(eventData);
      return res.status(200).json({ msg: "Event added Successfully" });
    } catch (error) {
      return res.status(400).json({ "Error Occurred": error });
    }
  };

  static getLimit = async (req: Request, res: Response) => {
    try {
      const limit = 5;
      const skip = 2;
      const data = await Service.getLimit(limit, skip);
      return res
        .status(200)
        .json({ "No of Documents": data.length, "Data is": data });
    } catch (error) {
      return res.status(400).json({ "Error Occured": error });
    }
  };

  static async getByType(req: Request, res: Response) {
    try {
      const type = req.params.type;
      const event = await Service.findByType(type);
      if (event.length !== 0) {
        return res.status(200).json({ "Data is": event });
      } else {
        return res.status(400).json({ message: "No event found" });
      }
    } catch (error) {
      res.status(400).json({ "Error Occured": error });
    }
  }

  public static deleteByStatus = async (req: Request, res: Response) => {
    try {
      const status = req.params.status;
      const event = await Service.findByStatus(status);
      if (event.length !== 0) {
        const response = await Service.deleteByStatus(status);
        if (response) return res.status(200).json({ message: "event deleted" });
      } else {
        return res.status(400).json({ message: "No event exist" });
      }
    } catch (error) {
      res.status(400).json({ "Error Occured": error });
    }
  };

  static async updateStatus(req: Request, res: Response) {
    try {
      const { status1, status2 } = req.query;
      const ustatus1: string = typeof status1 === "string" ? status1 : "";
      const ustatus2: string = typeof status2 === "string" ? status2 : "";

      const event = await Service.findByStatus(ustatus1);
      if (event.length !== 0) {
        const isUpdated = await Service.updateByStatus(ustatus1, ustatus2);
        if (isUpdated)
          return res.status(200).json({ message: "status updated" });
      } else {
        return res.status(400).json({ message: "No event exist" });
      }
    } catch (error) {
      res.status(400).json({ "Error Occured": error });
    }
  }

  static async countEvents(req: Request, res: Response) {
    try {
      const data = await Service.count();
      return res.status(200).json({ "No of Documents is:": data });
    } catch (error) {
      return res.status(400).json({ "Error Occurred": error });
    }
  }

  static async deleteAll(req: Request, res: Response) {
    try {
      await Service.deleteAll();
      return res.status(200).json({ "Message:": "Documents Deleted" });
    } catch (error) {
      return res.status(400).json({ "Error Occurred": error });
    }
  }
}

export default Controller;
