import jwt from "jsonwebtoken";

const PostData = (req, res) => {
  const data = req.body;
  console.log(data);
};

const GetData = (req, res) => {
  try{
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
  ]);}
  catch(err){
    next(err)
  }
};
const secretKey = "myNameIsMunendraKumarKushwaha";
const Login = (req, res) => {
  const user = { id: 1, name: "monu" };
  jwt.sign(user, secretKey, { expiresIn: "30m" }, (err, token) => {
    res.json({ token });
  });
};

export { GetData, PostData, Login };
