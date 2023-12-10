import { Response, Request } from "express";
import { Service } from ".";
import { ILogin, IUser } from "./entities";

class Controller {
  public static login = async (req: Request, res: Response) => {
    try {
      const loginData: ILogin = req.body;
      const isAuthenticated = await Service.login(loginData);
      if (isAuthenticated) {
        const token = Service.generateToken(loginData);
        return res
          .status(200)
          .json({ msg: "Login Successful", tokenIs: token });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      return res.status(400).json({ "Error Occured": error });
    }
  };

  public static register = async (req: Request, res: Response) => {
    try {
      const registerData: IUser = req.body;
      await Service.register(registerData);
      res.status(200).json({ message: "Registered Successfully" });
    } catch (error) {
      res.status(400).json({ "Error Occured": error });
    }
  };

  public static findByName = async (req: Request, res: Response) => {
    try {
      const name = req.params.name;
      const user = await Service.findByName(name);
      if (user.length !== 0) {
        return res.status(200).json({ "Data is": user });
      } else {
        return res.status(400).json({ message: "No user found" });
      }
    } catch (error) {
      res.status(400).json({ "Error Occured": error });
    }
  };

  public static deleteByName = async (req: Request, res: Response) => {
    try {
      const name = req.params.name;
      const user = await Service.findByName(name);
      if (user.length !== 0) {
        const response = await Service.deleteByName(name);
        if (response) return res.status(200).json({ message: "user deleted" });
      } else {
        return res.status(400).json({ message: "No user exist" });
      }
    } catch (error) {
      res.status(400).json({ "Error Occured": error });
    }
  };

  public static updateByName = async (req: Request, res: Response) => {
    try {
      const { name1, name2 } = req.query;
      const uname1: string = typeof name1 === "string" ? name1 : "";
      const uname2: string = typeof name2 === "string" ? name2 : "";

      const user = await Service.findByName(uname1);
      if (user.length !== 0) {
        const isUpdated = await Service.updateByName(uname1, uname2);
        if (isUpdated) return res.status(200).json({ message: "user updated" });
      } else {
        return res.status(400).json({ message: "No user exist" });
      }
    } catch (error) {
      res.status(400).json({ "Error Occured": error });
    }
  };
}

export default Controller;
