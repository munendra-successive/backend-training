"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otherRouter = exports.router = void 0;
const userRoutes_js_1 = __importDefault(require("./userRoutes.js"));
exports.router = userRoutes_js_1.default;
const otherRoutes_js_1 = __importDefault(require("./otherRoutes.js"));
exports.otherRouter = otherRoutes_js_1.default;
