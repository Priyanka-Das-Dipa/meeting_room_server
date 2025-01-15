"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsRouter = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const validationRequest_1 = __importDefault(require("../../middleWare/validationRequest"));
const booking_validation_1 = require("./booking.validation");
const router = (0, express_1.Router)();
router.post("/bookings", (0, validationRequest_1.default)(booking_validation_1.bookingValidation.bookingValidationSchema), booking_controller_1.bookingController.addBooking);
router.get("/bookings", booking_controller_1.bookingController.getAllBooking);
router.get("/my-bookings", booking_controller_1.bookingController.getSingleBooking);
router.delete("/bookings/:id", booking_controller_1.bookingController.deleteBooking);
exports.bookingsRouter = router;
