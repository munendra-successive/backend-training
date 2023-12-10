import { Document } from "mongoose";
import { ILocation } from "../entities/index.js";
export default interface IEvent extends Document {
  name: string;
  location: ILocation;
  description: string;
  startDate: Date;
  endDate: Date;
  category: string;
  organizerInfo: string;
  type: string;
  status: string;
  createdAt: string;
}
