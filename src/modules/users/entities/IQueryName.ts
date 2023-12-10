import { FilterQuery } from "mongoose";
import { IUser } from "./index.js";
export default interface IQueryName extends FilterQuery<IUser> {
  name: string;
}
