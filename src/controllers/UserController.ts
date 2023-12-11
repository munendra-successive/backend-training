import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserServiceInstance, CountryServiceInstance } from "../services";

class UserController {
  private secretKey: string;
  constructor() {
    this.secretKey = "myNameIsMunendraKumarKushwaha";
  }

  public Login = (req: Request, res: Response) => {
    const user = { id: 1, name: "monu" };
    jwt.sign(user, this.secretKey, { expiresIn: "30m" }, (err, token) => {
      if (err) {
        // Handle error
        res.status(500).json({ error: "Failed to generate token" });
      } else {
        res.status(200).json({ token: token });
      }
    });
  };

  public addCountry = async (req: Request, res: Response) => {
    const data = req.body;
    await CountryServiceInstance.addCountries(data);
    res.status(200).json({ message: "Data added successfully" });
  };

  public addUser = async (req: Request, res: Response) => {
    const data = req.body;
    const response = await UserServiceInstance.addUser(data);
    res.status(200).json({ "Data is": response });
  };
}
export default new UserController();
