import createError from "http-errors";

const queryValidator = (req, res, next) => {
  if (!isNaN(req.params.query)) {
    res.send("Is a number");
    next();
  } else {
    res.status(404).send("NOt a number");
  }
};

export default queryValidator;
