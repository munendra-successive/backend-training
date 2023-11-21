import cookieParser from "cookie-parser";
import express from 'express'
var app = express();
app.use(cookieParser());

app.get("/", function (req, res) {
  res.cookie({name:"Monu",isYoung:true,
    maxAge: 900000,
    httpOnly: true,
  });
  res.send("Cookies example");
  console.log("Cookies:", req.cookies);
});

app.listen(8080, () => {
  console.log("Listening on port: 8080");
});
