const errorHandler = (err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message || "Error Occured";
  res.status(status).json({ message });
};
export default errorHandler;
