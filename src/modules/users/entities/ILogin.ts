import { Document } from "mongoose";
export default interface ILogin extends Document {
  email: string;
  password: string;
}
