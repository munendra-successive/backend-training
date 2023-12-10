import { FilterQuery } from "mongoose";
import {IUser} from "./index.js"
export default interface IQueryEmail extends FilterQuery<IUser> {
  email: string;
}
