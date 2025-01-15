"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
// import notFound from "./app/middleWare/notFound";
const globalErrorhandler_1 = __importDefault(require("./app/middleWare/globalErrorhandler"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: ["http://localhost:5173/"], credentials: true }));
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("Meeting Room Server is Running!");
});
app.use(globalErrorhandler_1.default);
// app.use(notFound);
exports.default = app;
