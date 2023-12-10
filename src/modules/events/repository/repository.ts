import IEvent from "../entities/IEvent";
import IQueryStatus from "../entities/IQueryStatus";
import { EventModel } from "./model";
import BaseRepository from "../../../lib/base/baseRepository";
import mongoose from "mongoose";

class Repository extends BaseRepository<IEvent> {
  private eventModel: mongoose.Model<IEvent>;

  constructor() {
    super(EventModel);
    this.eventModel = EventModel;
  }

  async getLimit(limit: number, skip: number) {
    return await this.eventModel.find().limit(limit).skip(skip);
  }

  async deleteByStatus(status: IQueryStatus) {
    return await this.eventModel.deleteOne(status);
  }
}

export default new Repository();
