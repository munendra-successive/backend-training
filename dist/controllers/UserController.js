"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.PostData = exports.GetData = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PostData = (req, res) => {
    const data = req.body;
    console.log(data);
    res.send("Data Posted Successfully");
};
exports.PostData = PostData;
const GetData = (req, res, next) => {
    try {
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
    }
    catch (err) {
        next(err);
    }
};
exports.GetData = GetData;
const secretKey = "myNameIsMunendraKumarKushwaha";
const Login = (req, res) => {
    const user = { id: 1, name: "monu" };
    jsonwebtoken_1.default.sign(user, secretKey, { expiresIn: "30m" }, (err, token) => {
        res.json({ token });
    });
};
exports.Login = Login;
