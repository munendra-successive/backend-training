const queryValidator = (req, res) => {
  if (!isNaN(req.query.age)) {
    return res.status(200).send("Is a number");
  } else {
    res.status(404).send("Not a number");
  }
};

export default queryValidator;
