import { Repository } from "./repository";
import { ILogin, IUser, IQueryName } from "./entities";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class Service {
  private static secretKey = "myNameIsMunendraKumarKushwaha";

  public static generateToken(loginData: ILogin) {
    const token = jwt.sign(loginData, Service.secretKey, { expiresIn: "30m" });
    return token;
  }

  public static async login(loginData: ILogin) {
    const { email, password } = loginData;
    const filter = { email: email };
    const user = await Repository.findByField(filter);

    if (user) {
      return await bcrypt.compare(password, user[0].password);
    } else {
      return false;
    }
  }

  public static async register(regData: IUser) {
    return await Repository.register(regData);
  }

  public static updateByName = async (oldName: string, newName: string) => {
    const filter = { name: oldName };
    const update = { $set: { name: newName } };
    return await Repository.updateRecords(filter, update);
  };

  public static findByName = async (name: string) => {
    const filter = { name: name };
    return await Repository.findByField(filter);
  };

  public static deleteByName = async (name: string) => {
    const query: IQueryName = { name };
    return await Repository.deleteByName(query);
  };
}
export default Service;
