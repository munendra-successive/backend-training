import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import UserServiceInstance from "../services/UserService";
import CountryServiceInstance from "../services/CountryService";
class UserController {
  private secretKey: string;
  constructor() {
    this.secretKey = "myNameIsMunendraKumarKushwaha";
  }

  public PostData(req: Request, res: Response) {
    const data = req.body;
    console.log(data);
    res.send("Data Posted Successfully");
  }

  public GetData(req: Request, res: Response, next: NextFunction) {
    try {
      res.json([
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
        },
        {
          id: 2,
          name: "Ervin Howell",
          username: "Antonette",
          email: "Shanna@melissa.tv",
        },
      ]);
    } catch (err) {
      next(err);
    }
  }
  public Login = (req: Request, res: Response) => {
    const user = { id: 1, name: "monu" };
    jwt.sign(user, this.secretKey, { expiresIn: "30m" }, (err, token) => {
      if (err) {
        // Handle error
        res.status(500).json({ error: "Failed to generate token" });
      } else {
        res.json({ token });
      }
    });
  };

  public addCountry = async (req: Request, res: Response) => {
    const data = req.body;
    const response = await CountryServiceInstance.addCountries(data);
    await CountryServiceInstance.findCountry();
    res.json({ "Your data": response });
  };

  public addUser = async (req: Request, res: Response) => {
    const data = req.body;
    const response = await UserServiceInstance.addUser(data);
    res.json({ "Data is": response });
  };
}
export default new UserController();
