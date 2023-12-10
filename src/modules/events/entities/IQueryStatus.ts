import { FilterQuery } from "mongoose";
import { IEvent } from "./index.js";
export default interface IQueryStatus extends FilterQuery<IEvent> {
  status: string;
}
