import fs from "fs";

const PostData = (req, res) => {
  const data = req.body;
  console.log(data);
};

const GetData = (req, res) => {
  res.json([
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
    },
  ]);
};

export { GetData, PostData };
