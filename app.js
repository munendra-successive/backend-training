import express from 'express'
import mockData from './mockData.js';
const app = express();

app.get("/", (req, res) => {
  res.send("Hi welcome to mock api");
});
app.get("/api", (req, res) => {
  res.json(mockData);
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
