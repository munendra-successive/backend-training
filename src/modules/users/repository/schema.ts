import mongoose from "mongoose";
import { IUser } from "../entities";

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
});

export default UserSchema;
