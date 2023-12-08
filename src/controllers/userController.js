import seedData from "../utils/seedData.js";
const PostData = (req, res) => {
  const data = req.body;
  console.log(data);
  if (data) {
    res.send("Successfull");
  }
};

const GetData = (req, res) => {
  res.json(seedData);
};

export { GetData, PostData };
