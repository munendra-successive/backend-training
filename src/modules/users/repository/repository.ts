import { UserModel } from ".";
import { type IUser, type IQueryName } from "../entities";
import type mongoose from "mongoose";
import bcrypt from "bcrypt";
import { BaseRepository } from "../../../lib/index.js";

class Repository extends BaseRepository<IUser> {
  private readonly userModel: mongoose.Model<IUser>;
  constructor() {
    super(UserModel);
    this.userModel = UserModel;
  }

  public async deleteByName(name: IQueryName): Promise<any> {
    return await this.userModel.deleteOne(name);
  }

  public async register(regData: IUser): Promise<any> {
    const hashPassword: string = await bcrypt.hash(regData.password, 10);
    const newUser: any = {
      ...regData,
      password: hashPassword,
    };
    return await this.userModel.create(newUser);
  }
}
export default new Repository();
