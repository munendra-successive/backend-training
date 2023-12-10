import { UserModel } from ".";
import { IUser, IQueryName } from "../entities";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { BaseRepository } from "../../../lib/index.js";

class Repository extends BaseRepository<IUser> {
  private userModel: mongoose.Model<IUser>;
  constructor() {
    super(UserModel);
    this.userModel = UserModel;
  }

  public async deleteByName(name: IQueryName) {
    return await this.userModel.deleteOne(name);
  }

  public async register(regData: IUser) {
    const hashPassword = await bcrypt.hash(regData.password, 10);
    const newUser = {
      ...regData,
      password: hashPassword,
    };
    return await this.userModel.create(newUser);
  }
}
export default new Repository();
