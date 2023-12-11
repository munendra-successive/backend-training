import mongoose from "mongoose";
import { UserModel } from "../models";
import { IUser } from "./interface";

import BaseRepository from "./base/BaseRepository";
class UserRepository extends BaseRepository<IUser> {
  private UserModel: mongoose.Model<IUser>;
  constructor() {
    super(UserModel);
    this.UserModel = UserModel;
  }

  insert = async (data: IUser) => {
    await this.insertRecords(data);
  };

  findAll = async () => {
    return await this.findRecords();
  };

  findByUserName = async () => {
    return await this.UserModel.findOne({ name: "monu" });
  };

  deleteByUserName = async () => {
    await this.UserModel.deleteMany({ name: "monu" });
  };

  UpdateByUserName = async () => {
    await this.UpdateRecords({ name: "monu" }, { $set: { name: "Munendra" } });
  };

  find = async () => {
    return await this.findRecords();
  };
}

export default new UserRepository();
