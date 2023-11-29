import express from "express";
import { router, otherRouter } from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
const app = express();

app.use(express.json());
app.use("/", otherRouter);
app.use("/users", router);
app.use("*", (req, res) => {
  res.status(404).send("URL not found");
});

app.use(errorHandler);
app.use((err, req, res, next) => {
  res.status(401).send("Error Occured");
});
app.listen(8000, () => {
  console.log("listening on port: 8000");
});
