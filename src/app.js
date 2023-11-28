import express from "express";
import { router } from "./routes/index.js";
import { geoLocation } from "./middlewares/index.js";
const app = express();
// app.set("trust proxy", true);

app.use(express.json());

// Base URL
app.use("/", (req, res) => {
  res.send("This is the base page");
});

// Routes
app.use("/users", geoLocation, router);

app.listen(8000, () => {
  console.log("listening on port: 8000");
});
