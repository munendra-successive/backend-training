import { userConfig } from "../utils/config.js";
const validate = (req, res, next) => {
  console.log(req.originalUrl);
  const mySchema = userConfig(req.originalUrl);
  const { error, value } = mySchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json(error.details);
  }
  console.log(value);
  next();
};

export default validate;
