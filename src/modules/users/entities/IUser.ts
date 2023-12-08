import { Document } from "mongoose";
import IAddress from "./IAddress";
export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address: IAddress;
  phone: string;
}
