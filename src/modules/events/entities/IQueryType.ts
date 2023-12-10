import { FilterQuery } from "mongoose";
import { IEvent } from "./index.js";
export default interface IQueryType extends FilterQuery<IEvent> {
  type: string;
}
