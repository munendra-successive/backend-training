const addCustomHeader = (req, res, next) => {
  res.setHeader("customHeader", "X-myCustomHeader");
  next();
};
export default addCustomHeader;
