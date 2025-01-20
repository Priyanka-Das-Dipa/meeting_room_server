import { Router } from "express";
import { bookingController } from "./booking.controller";
import validationRequest from "../../middleWare/validationRequest";
import { bookingValidation } from "./booking.validation";

const router = Router();

router.post("/bookings", validationRequest(bookingValidation.bookingValidationSchema),bookingController.addBooking);
router.get("/bookings", bookingController.getAllBooking);

router.get("/my-bookings", bookingController.getSingleBooking);

router.delete("/bookings/:id", bookingController.deleteBooking);

router.put("/confirm-booking/:id",  bookingController.conFirmBookingByAdmin);
router.post("/confirm-payment", bookingController.confirmPayment);

export const bookingsRouter = router;
