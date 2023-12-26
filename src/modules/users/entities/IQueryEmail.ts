import { type FilterQuery } from "mongoose";
import { type IUser } from "./index.js";
export default interface IQueryEmail extends FilterQuery<IUser> {
  email: string;
}
