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
exports.slotService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const slot_utils_1 = require("./slot.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const slot_modal_1 = require("./slot.modal");
const addASlot = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createSlotTime = yield (0, slot_utils_1.generateSlot)(payload === null || payload === void 0 ? void 0 : payload.startTime, payload === null || payload === void 0 ? void 0 : payload.endTime);
    // check slot time is available
    const slotExist = yield (0, slot_utils_1.checkSlotExist)(payload.room, payload.date, createSlotTime);
    if (slotExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "One or more slots already exist within the specified time range.");
    }
    return yield (0, slot_utils_1.createSlots)(payload.room, payload.date, createSlotTime);
});
// old slot delete and create 5 slot each month 10 date automatically
const getAllSlot = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_modal_1.Slot.find().populate("room").sort("room");
    return result;
});
// delete slot
const deleteASlot = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check slot is exist
    const isExist = yield slot_modal_1.Slot.findById(payload);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slot Not found for delete");
    }
    const result = yield slot_modal_1.Slot.deleteOne({ _id: payload });
    return result;
});
// delete all old slot
const deleteALLOldSlot = () => __awaiter(void 0, void 0, void 0, function* () {
    // check slot is exist
    const today = new Date();
    // set all time 0 like hour, minutes, seconds, milliseconds
    today.setHours(0, 0, 0, 0);
    // const available = await Slot.find({ date: { $lt: today }, isBooked: false });
    yield slot_modal_1.Slot.deleteMany({ date: { $lt: today }, isBooked: false });
    // Generate the slot times, e.g., 10:00 and 15:00
    const createSlotTime = yield (0, slot_utils_1.generateSlot)("10:00", "15:00");
    // Set the date to the 15th of the current month
    const now = new Date();
    const fifteenthOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 15);
    const roomId = new mongoose_1.default.Types.ObjectId("66d32f64c7529009f28cebd0"); //create dynamic slot for pinnacle room every month
    // Check if the slot already exists on the 15th
    const slotExist = yield slot_modal_1.Slot.find({
        room: roomId,
        date: { $lte: fifteenthOfMonth },
        isBooked: false,
    });
    if (slotExist.length) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "One or more slots already exist within the specified time range.");
    }
    else {
        // Create the slot if it doesn't exist
        yield (0, slot_utils_1.createSlots)(roomId, fifteenthOfMonth, createSlotTime);
    }
});
// update slot
const updateASlot = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check updatable slot exist
    const isExistRequestedSlot = yield slot_modal_1.Slot.findById(id);
    if (!isExistRequestedSlot) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This Slot is not Exist");
    }
    // empty array for created slots
    const comingSlots = [];
    if (payload.startTime && payload.endTime) {
        comingSlots.push({
            startTime: payload.startTime,
            endTime: payload.endTime,
        });
        // check the slot schedule is available
        const slotNotExist = yield (0, slot_utils_1.checkSlotExist)(payload.room, payload.date, comingSlots);
        if (slotNotExist) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, "Slot Time is not available");
        }
    }
    const result = yield slot_modal_1.Slot.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.slotService = {
    addASlot,
    getAllSlot,
    deleteASlot,
    updateASlot,
    deleteALLOldSlot,
};
