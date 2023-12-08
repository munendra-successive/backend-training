import mongoose, { Model } from "mongoose";
import UserSchema from "./schema";
import IUser from "../entities/IUser";

const UserModel: Model<IUser> = mongoose.model<IUser>("users", UserSchema);
export { UserModel };
