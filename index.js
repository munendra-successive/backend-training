import { argv } from "node:process";
import { add, sub, mul, div } from "./lib/math.js";
import fs from "fs";
const num1 = Number(argv[2]);
const num2 = Number(argv[3]);
const operations = [
  ["Addition", num1, num2, add(num1, num2)],
  ["Subtraction", num1, num2, sub(num1, num2)],
  ["Multiply", num1, num2, mul(num1, num2)],
  ["Division", num1, num2, div(num1, num2)],
];

fs.appendFile(
  "data.csv",
  operations.reduce((value, item) => value + "\n" + item) + "\n",
  "utf-8",
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Data saved");
    }
  }
);
