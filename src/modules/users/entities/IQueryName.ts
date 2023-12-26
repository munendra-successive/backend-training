import { type FilterQuery } from "mongoose";
import { type IUser } from "./index.js";
export default interface IQueryName extends FilterQuery<IUser> {
  name: string;
}
