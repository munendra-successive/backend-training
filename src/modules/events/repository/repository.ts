import type IEvent from "../entities/IEvent";
import type IQueryStatus from "../entities/IQueryStatus";
import { EventModel } from "./model";
import BaseRepository from "../../../lib/base/baseRepository";
import type mongoose from "mongoose";

class Repository extends BaseRepository<IEvent> {
  private readonly eventModel: mongoose.Model<IEvent>;

  constructor() {
    super(EventModel);
    this.eventModel = EventModel;
  }

  async getLimit(limit: number, skip: number): Promise<any> {
    return await this.eventModel.find().limit(limit).skip(skip);
  }

  async deleteByStatus(status: IQueryStatus): Promise<any> {
    return await this.eventModel.deleteOne(status);
  }
}

export default new Repository();
