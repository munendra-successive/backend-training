import userSchema from "../schema.js";
const validate = (req, res, next) => {
  const result = userSchema.validate(req.body);
  if (result.error) {
    console.log("Error Occured:", result.error.details[0].message);
    res.send("ok");
  } else {
    console.log(result.value);
    next();
  }
};

export default validate;
