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
exports.slotController = void 0;
const catchAsynch_1 = __importDefault(require("../../utils/catchAsynch"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const slot_service_1 = require("./slot.service");
const http_status_1 = __importDefault(require("http-status"));
const addSlot = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_service_1.slotService.addASlot(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Slots created successfully",
        data: result,
    });
}));
const getAllSlot = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_service_1.slotService.getAllSlot(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Available slots retrieved successfully",
        data: result,
    });
}));
const deleteSlot = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield slot_service_1.slotService.deleteASlot((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Slot Deleted Successfull",
        data: result,
    });
}));
const updateSlot = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const result = yield slot_service_1.slotService.updateASlot((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Slot Updated successfully",
        data: result,
    });
}));
const deleteAllOldSlot = (0, catchAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield slot_service_1.slotService.deleteALLOldSlot;
}));
exports.slotController = {
    addSlot,
    getAllSlot,
    deleteSlot,
    updateSlot,
    deleteAllOldSlot,
};
