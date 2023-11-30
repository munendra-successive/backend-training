"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_js_1 = __importDefault(require("../schema.js"));
const validate = (req, res, next) => {
    const { error, value } = schema_js_1.default.validate(req.body);
    if (error) {
        console.log("Error Occured:", error.details[0].message);
        return res.status(400).send({
            status: false,
            message: "Data is Not Valid",
            error
        });
    }
    else {
        console.log(value);
        next();
    }
};
exports.default = validate;
