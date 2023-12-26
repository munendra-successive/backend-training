import { type Response, type Request } from "express";
import { Service } from "./index.js";
import { type IEvent } from "./entities";

class Controller {
  getAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const data: any = await Service.getAll();
      return res.status(200).json({ "Data is:": data });
    } catch (error) {
      return res.status(400).json({ "Error Occurred": error });
    }
  };

  public add = async (req: Request, res: Response): Promise<any> => {
    try {
      const eventData: IEvent = req.body;
      await Service.add(eventData);
      return res.status(200).json({ msg: "Event added Successfully" });
    } catch (error) {
      return res.status(400).json({ "Error Occurred": error });
    }
  };

  getLimit = async (req: Request, res: Response): Promise<any> => {
    try {
      const limit: number = 5;
      const skip: number = 2;
      const data: any = await Service.getLimit(limit, skip);
      return res
        .status(200)
        .json({ "No of Documents": data.length, "Data is": data });
    } catch (error) {
      return res.status(400).json({ "Error Occured": error });
    }
  };

  getByType = async (req: Request, res: Response): Promise<any> => {
    try {
      const type: string = req.params.type;
      const event: any = await Service.findByType(type);
      if (event.length !== 0) {
        return res.status(200).json({ "Data is": event });
      } else {
        return res.status(400).json({ message: "No event found" });
      }
    } catch (error) {
      res.status(400).json({ "Error Occured": error });
    }
  };

  public deleteByStatus = async (req: Request, res: Response): Promise<any> => {
    try {
      const status: string = req.params.status;
      const event: any = await Service.findByStatus(status);
      if (event.length !== 0) {
        const response: any = await Service.deleteByStatus(status);
        if (response) return res.status(200).json({ message: "event deleted" });
      } else {
        return res.status(400).json({ message: "No event exist" });
      }
    } catch (error) {
      res.status(400).json({ "Error Occured": error });
    }
  };

  updateStatus = async (req: Request, res: Response): Promise<any> => {
    try {
      const { status1, status2 } = req.query;
      const ustatus1: string = typeof status1 === "string" ? status1 : "";
      const ustatus2: string = typeof status2 === "string" ? status2 : "";

      const event: any = await Service.findByStatus(ustatus1);
      if (event.length !== 0) {
        const isUpdated: boolean = await Service.updateByStatus(
          ustatus1,
          ustatus2,
        );
        if (isUpdated)
          return res.status(200).json({ message: "status updated" });
      } else {
        return res.status(400).json({ message: "No event exist" });
      }
    } catch (error) {
      res.status(400).json({ "Error Occured": error });
    }
  };

  countEvents = async (req: Request, res: Response): Promise<any> => {
    try {
      const data: any = await Service.count();
      return res.status(200).json({ "No of Documents is:": data });
    } catch (error) {
      return res.status(400).json({ "Error Occurred": error });
    }
  };

  deleteAll = async (req: Request, res: Response): Promise<any> => {
    try {
      await Service.deleteAll();
      return res.status(200).json({ "Message:": "Documents Deleted" });
    } catch (error) {
      return res.status(400).json({ "Error Occurred": error });
    }
  };

  getById = async (req: Request, res: Response): Promise<any> => {
    try {
      const id: string = req.params.id;
      console.log("id is", id);

      const event: any = await Service.findById(id);
      if (event.length !== 0) {
        return res.status(200).json({ "Data is": event });
      } else {
        return res.status(400).json({ message: "No event found" });
      }
    } catch (error) {
      res.status(400).json({ "Error Occured": error });
    }
  };
}

export default new Controller();
