"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = require("./routes/index.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use("/", otherRouter);
app.use("/users", index_js_1.router);
// app.use("*", (req, res) => {
//   res.status(404).send("URL not found");
// });
app.use((err, req, res, next) => {
  res.status(401).send("Error Occured");
});
app.listen(8000, () => {
  console.log("listening on port: 8000");
});
