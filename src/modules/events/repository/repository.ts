import IEvent from "../entities/IEvent";
import { EventModel } from "./model";
import mongoose from "mongoose";

class Repository {
  private eventModel: mongoose.Model<IEvent>;

  constructor() {
    this.eventModel = EventModel;
  }

  public async addEvent(eventData: IEvent) {
    try {
      const getData = await this.eventModel.create(eventData);
      console.log("Event Added Successfully");
      return getData;
    } catch (error) {
      console.log("Error in repo in adding event", error);
    }
  }
}

export default new Repository();
