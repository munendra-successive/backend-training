import { Date, Document } from "mongoose";
import ILocation from "./ILocation";

export default interface IEvent extends Document {
  name: string;
  location: ILocation;
  description: string;
  startDate: Date;
  endDate: Date;
  category: string;
  oragnizerInfo: string;
  type: string;
  status: string;
}
