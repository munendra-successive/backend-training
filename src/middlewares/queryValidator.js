const queryValidator = (req, res, next) => {
  if (!isNaN(req.query.age)) {
    res.send("Is a number");
    next();
  } else {
    res.status(404).send("Not a number");
  }
};

export default queryValidator;
