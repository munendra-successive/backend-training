const logger = (req, res, next) => {
  console.log(
    `Method is ${req.method}, Urls is ${
      req.url
    } and TimeStamp is: ${new Date().toLocaleString()}`
  );
  next();
};

export default logger;
