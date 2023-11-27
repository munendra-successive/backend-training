import express from "express";
import { router } from "./routes/index.js";
import { geoLocation } from "./middlewares/index.js";
const app = express();
app.set("trust proxy", true);

app.use(express.json());

app.use("/users", geoLocation, router);

app.listen(8000, () => {
  console.log("listening on port: 8000");
});
