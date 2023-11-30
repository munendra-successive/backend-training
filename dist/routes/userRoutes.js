"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = require("../controllers/index.js");
const index_js_2 = require("../middlewares/index.js");
const http_errors_1 = __importDefault(require("http-errors"));
const router = express_1.default.Router();
router.route("/").get(index_js_2.authenticate, index_js_1.GetData);
router.route("/").post(index_js_2.authenticate, index_js_1.PostData);
router.route("/:id").get((req, res, next) => {
    if (!isNaN(Number(req.params.id))) {
        res.send("Is a number");
    }
    else {
        next((0, http_errors_1.default)(400, "Not a number"));
    }
});
router.route("/login").post(index_js_2.validate, index_js_1.Login);
exports.default = router;
