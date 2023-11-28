import { userConfig } from "../utils/config.js";
const validate = (req, res, next) => {
  console.log(req.originalUrl);
  const mySchema = userConfig(req.originalUrl);
  const { error, value } = mySchema.validate(req.body);
  if (error) {
    console.log("Error Occured:", error.details[0].message);
    return res.status(400).send(`${error.details[0].message}`);
  }
  console.log(value);
  next();
};

export default validate;
