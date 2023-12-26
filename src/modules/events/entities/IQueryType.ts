import { type FilterQuery } from "mongoose";
import { type IEvent } from "./index.js";
export default interface IQueryType extends FilterQuery<IEvent> {
  type: string;
}
