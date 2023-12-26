import { type FilterQuery } from "mongoose";
import { type IEvent } from "./index.js";
export default interface IQueryStatus extends FilterQuery<IEvent> {
  status: string;
}
