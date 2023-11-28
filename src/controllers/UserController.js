import jwt from "jsonwebtoken";

// PostData
const PostData = (req, res) => {
  const data = req.body;
  console.log(data);
};

//GetData
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
const secretKey = "myNameIsMunendraKumarKushwaha";

// Login
const Login = (req, res) => {
  const user = { id: 1, name: "monu" };
  jwt.sign(user, secretKey, { expiresIn: "30m" }, (err, token) => {
    res.json({ token });
  });
};

export { GetData, PostData, Login };
