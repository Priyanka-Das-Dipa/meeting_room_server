"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = __importDefault(require("./app/middleWare/notFound"));
const globalErrorhandler_1 = __importDefault(require("./app/middleWare/globalErrorhandler"));
const app = (0, express_1.default)();
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("Meeting Room Server is Running!");
});
app.use(notFound_1.default);
app.use(globalErrorhandler_1.default);
exports.default = app;
