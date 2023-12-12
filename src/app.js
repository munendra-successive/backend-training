import express from "express";
import { router } from "./routes/index.js";
import { logger, errorHandler, rateLimit } from "./middleWares/index.js";
const app = express();

app.use(express.json());

app.use(logger, rateLimit);

app.use("/users", router);

app.use("*/*", (req, res) => {
  res.status(401).json({ message: "Invalid Route" });
});

app.use(errorHandler);

app.listen(8000, () => {
  console.log("listening on port: 8000");
});
