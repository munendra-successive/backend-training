"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "myNameIsMunendraKumarKushwaha";
const authenticate = (req, res, next) => {
    const token = req.header("authorization");
    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.body.user = decoded;
        console.log(req.body.user);
        next();
    }
    catch (error) {
        return res.status(401).send({
            status: false,
            message: "JWT expired, You are unauthorized",
            error
        });
    }
};
exports.default = authenticate;
