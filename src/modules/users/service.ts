import Repository from "./repository/repository";
import ILogin from "./entities/ILogin";
import IUser from "./entities/IUser";
import bcrypt from "bcrypt";

class Service {
  public static async login(loginData: ILogin) {
    const { email, password } = loginData;
    const user = await Repository.findByLoginData(email);

    if (user) {
      return await bcrypt.compare(password, user.password);
    } else {
      return false;
    }
  }
  public static async register(regData: IUser) {
    try {
      //   const hashPassword = String(await bcrypt.hash(regData.password, 10));
      //   const newUser = {
      //     ...regData,
      //     password: hashPassword,
      //   };
      const response = await Repository.register(regData);
      if (response) {
        console.log("Registerd Successful");
      }
    } catch (error) {
      console.log("Error Occured");
    }
  }
}
export default Service;
