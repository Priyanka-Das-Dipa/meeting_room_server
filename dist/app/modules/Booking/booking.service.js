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
exports.bookingService = void 0;
const booking_validation_1 = require("./booking.validation");
const addRoomBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_validation_1.bookingValidation.create();
    return result;
});
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () { });
const getSingleBooking = () => __awaiter(void 0, void 0, void 0, function* () { });
const deleteBooking = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.bookingService = {
    addRoomBooking,
    getAllBookings,
    getSingleBooking,
    deleteBooking,
};
