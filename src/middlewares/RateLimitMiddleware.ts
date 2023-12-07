import { Response, Request, NextFunction } from "express";
import fs from "fs";

class RateLimiter {
  userRequests: { [key: string]: { timestamp: number; count: number } };
  limit: number;
  window: number;

  constructor() {
    this.userRequests = this.loadUserRequests();
    this.limit = 5;
    this.window = 60000;
  }

  private loadUserRequests(): {
    [key: string]: { timestamp: number; count: number };
  } {
    try {
      const data = fs.readFileSync("userRequests.json", "utf8");
      return JSON.parse(data);
    } catch (err) {
      return {};
    }
  }

  private saveUserRequests(data: object) {
    fs.writeFileSync("userRequests.json", JSON.stringify(data), "utf8");
  }

  public rateLimit = (req: Request, res: Response, next: NextFunction) => {
    const username: string | undefined = req.header("name");
    const currentTime = Date.now();

    if (!username) {
      return res.status(400).json({ msg: "Username not provided" });
    }

    if (!this.userRequests[username]) {
      this.userRequests[username] = { timestamp: Date.now(), count: 1 };
    } else {
      if (currentTime - this.userRequests[username].timestamp > this.window) {
        this.userRequests[username].timestamp = currentTime;
        this.userRequests[username].count = 1;
      }
      if (this.userRequests[username].count > this.limit) {
        return res.status(429).json({ msg: "Too many requests" });
      }
      const newUser = {
        timestamp: this.userRequests[username].timestamp,
        count: this.userRequests[username].count + 1,
      };
      this.userRequests[username] = newUser;
    }
    this.saveUserRequests(this.userRequests);
    next();
  };
}

export default new RateLimiter();
