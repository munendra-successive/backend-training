import mongoose, { Model } from "mongoose";
import { UserSchema } from "./index.js";
import { IUser } from "../entities";

const UserModel: Model<IUser> = mongoose.model<IUser>("users", UserSchema);
export { UserModel };
