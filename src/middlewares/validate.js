import { userConfig } from "../utils/config.js";
const validate = (req, res, next) => {
  try {
    console.log(req.originalUrl);
    const mySchema = userConfig(req.originalUrl);
    const { error, value } = mySchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw error;
    }
    next();
  } catch (error) {
    return res.status(400).json(error.details);
  }
};

export default validate;
