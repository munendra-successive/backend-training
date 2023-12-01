import { Response, Request, NextFunction } from "express";
import fs from "fs";
function loadUserRequests() {
  try {
    const data = fs.readFileSync("userRequests.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

function saveUserRequests(data: Object) {
  fs.writeFileSync("userRequests.json", JSON.stringify(data), "utf8");
}
const userRequests = loadUserRequests();
const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  const limit = 5;
  const window = 60000;
  const username: any = req.header("name");
  const currentTime = Date.now();

  if (!userRequests[username]) {
    userRequests[username] = { timestamp: Date.now(), count: 1 };
  } else {
    if (currentTime - userRequests[username].timestamp > window) {
      userRequests[username].timestamp = currentTime;
      userRequests[username].count = 1;
    }
    if (userRequests[username].count > limit) {
      return res.status(429).json({ msg: "too many requests" });
    }
    const newUser = {
      timestamp: userRequests[username].timestamp,
      count: userRequests[username].count + 1,
    };
    userRequests[username] = newUser;
  }
  saveUserRequests(userRequests);
  next();
};
export default rateLimit;
