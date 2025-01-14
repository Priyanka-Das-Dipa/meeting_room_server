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
exports.bookingService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const booking_model_1 = require("./booking.model");
const booking_validation_1 = require("./booking.validation");
const http_status_1 = require("http-status");
const addRoomBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_validation_1.bookingValidation.create();
    return result;
});
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Bookings.find({ isDeleted: false })
        .populate({
        path: "room",
        populate: { path: "_id slots" },
    })
        .populate("user");
    return result;
});
const getSingleBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield booking_model_1.Bookings.find({ email: payload, isDeleted: false })
        .populate({
        path: "room",
        populate: { path: "_id slots" },
    })
        .populate("user");
    return userData;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield booking_model_1.Bookings.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.httpStatus.NOT_FOUND, "No Booking Found!");
    }
    const result = yield booking_model_1.Bookings.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    return result;
});
exports.bookingService = {
    addRoomBooking,
    getAllBookings,
    getSingleBooking,
    deleteBooking,
};
