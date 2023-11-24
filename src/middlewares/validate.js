import userSchema from "../schema.js";
const validate = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    console.log("Error Occured:", error.details[0].message);
    error.status = 400;
    error.message = "Data is Not Valid";
    next(error);
  } else {
    console.log(value);
    next();
  }
};

export default validate;
