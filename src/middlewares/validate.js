import userSchema from "../schema.js";
const validate = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    console.log("Error Occured:", error.details[0].message);
    res.status(400).send(`${error.details[0].message}`);
  } else {
    console.log(value);
    next();
  }
};

export default validate;
