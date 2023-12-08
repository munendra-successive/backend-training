import { Response, Request } from "express";
import Service from "./service";
import ILogin from "./entities/ILogin";
import IUser from "./entities/IUser";
class Controller {
  public static login = async (req: Request, res: Response) => {
    try {
      const loginData: ILogin = req.body;
      // const loginData: ILogin = { email: email, password: password };
      const isAuthenticated = await Service.login(loginData);
      if (isAuthenticated) {
        res.status(200).json({ msg: "Login Successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public static register = async (req: Request, res: Response) => {
    try {
      const registerData: IUser = req.body;
      await Service.register(registerData);
      res.status(200).json({ message: "Registered Successfully" });
    } catch (error) {
      console.log("Error in Controller Register");
    }
  };
}

export default Controller;
