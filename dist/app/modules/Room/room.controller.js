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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomController = void 0;
const catchAsynch_1 = __importDefault(require("../../utils/catchAsynch"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const room_service_1 = require("./room.service");
// create a room in Database
const createRoom = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.roomsServices.createRoom(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Room added successfully",
        data: result,
    });
}));
// get all room from Database
const getAllRoom = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.roomsServices.getAllRooms(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Rooms retrieved successfully",
        data: result,
    });
}));
// get a room from Database
const getASingleRoom = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.roomsServices.getASingleRoom(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Room retrieved successfully",
        data: result,
    });
}));
const updateARoom = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.roomsServices.updateRooms(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Room updated successfully",
        data: result,
    });
}));
// Delete a Room from the Database
const deleteARoom = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.roomsServices.deleteARoom(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Room deleted successfully",
        data: result,
    });
}));
exports.roomController = {
    createRoom,
    getAllRoom,
    getASingleRoom,
    updateARoom,
    deleteARoom
};
