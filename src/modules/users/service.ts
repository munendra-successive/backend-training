import { Repository } from "./repository";
import { type ILogin, type IUser, type IQueryName } from "./entities";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class Service {
  private readonly secretKey = "myNameIsMunendraKumarKushwaha";

  public generateToken(loginData: ILogin): string {
    const token: string = jwt.sign(loginData, this.secretKey, {
      expiresIn: "30m",
    });
    return token;
  }

  public async login(loginData: ILogin): Promise<any> {
    const { email, password } = loginData;
    const filter: { email: string } = { email };
    const user: any = await Repository.findByField(filter);

    if (user) {
      return await bcrypt.compare(password, user[0].password);
    } else {
      return false;
    }
  }

  public async register(regData: IUser): Promise<any> {
    return await Repository.register(regData);
  }

  public updateByName = async (
    oldName: string,
    newName: string,
  ): Promise<any> => {
    const filter: {
      name: string;
    } = { name: oldName };
    const update: {
      $set: {
        name: string;
      };
    } = { $set: { name: newName } };
    return await Repository.updateRecords(filter, update);
  };

  public findByName = async (name: string): Promise<any> => {
    const filter: {
      name: string;
    } = { name };
    return await Repository.findByField(filter);
  };

  public deleteByName = async (name: string): Promise<any> => {
    const query: IQueryName = { name };
    return await Repository.deleteByName(query);
  };
}
export default new Service();
