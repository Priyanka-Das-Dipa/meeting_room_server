"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserModelSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    address: { type: String, required: true },
    profileImage: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false, select: 0 },
});
exports.User = (0, mongoose_1.model)("User", UserModelSchema);
