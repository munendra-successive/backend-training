import { UserModel } from "./model";
import IUser from "../entities/IUser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

class Repository {
  private userModel: mongoose.Model<IUser>;
  constructor() {
    this.userModel = UserModel;
  }

  public async findByLoginData(email: string) {
    try {
      return await this.userModel.findOne({ email: email });
    } catch (error) {
      console.log("Login error in repository");
    }
  }

  async register(regData: IUser) {
    try {
      const hashPassword = String(await bcrypt.hash(regData.password, 10));
      const newUser = {
        ...regData,
        password: hashPassword,
      };
      const getUser = await this.userModel.create(newUser);
      console.log("Data Saved Successfully");
      return getUser;
    } catch (error) {
      console.log("Error in register repository ", error);
    }
  }
}
export default new Repository();
