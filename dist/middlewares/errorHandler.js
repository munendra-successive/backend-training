"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const { status, message } = err;
    res.status(status).json({ message });
};
exports.default = errorHandler;
