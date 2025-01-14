"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
// get all the user form the database
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, name, sortBy, sortOrder } = query;
    let userQuery = user_model_1.User.find({ isDeleted: false });
    // Search by role and name
    if (role) {
        userQuery = userQuery.where("role").equals(role);
    }
    if (name) {
        userQuery = userQuery.where("name").regex(new RegExp(name, "i")); // Case-insensitive search
    }
    // Sort
    if (sortBy && sortOrder) {
        const sortDirection = sortOrder === "desc" ? -1 : 1;
        userQuery = userQuery.sort({ [sortBy]: sortDirection });
    }
    const result = yield userQuery;
    return result;
});
// Delete the user from the database
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndUpdate(id, { isDeleted: true });
});
exports.userServices = {
    getAllUsers,
    deleteUser,
};
