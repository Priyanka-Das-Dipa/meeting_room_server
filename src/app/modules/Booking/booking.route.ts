import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();
router.post("/bookings", bookingController.addBooking);
router.get("/bookings", bookingController.getAllBooking);

router.get("/my-bookings", bookingController.getSingleBooking);

router.delete("/bookings/:id", bookingController.deleteBooking);

export const bookingsRouter = router;
