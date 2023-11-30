"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncThrowError = exports.asyncErrorHandler = void 0;
const asyncErrorHandler = (func) => {
    return (req, res, next) => {
        func(req, res, next)
            .then(() => res.status(200).send("No Error"))
            .catch((err) => next(err));
    };
};
exports.asyncErrorHandler = asyncErrorHandler;
const asyncThrowError = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject(new Error("Request Rejected"));
            resolve("No error");
        }, 1000);
    });
};
exports.asyncThrowError = asyncThrowError;
