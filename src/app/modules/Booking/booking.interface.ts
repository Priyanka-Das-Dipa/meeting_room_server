import { z } from "zod";
import { bookingValidation } from "./booking.validation";

export type TBooking = {
  room: string;
  slots: string;
  user: string;
  phone: string;
  paymentId: string;
  email: string;
  paymentTime: number;
  totalAmount: number;
  isConfirmed?: "confirmed" | "unconfirmed" | "canceled";
  isDeleted?: boolean;
};
export type TBookingInfer = z.infer<typeof bookingValidation.bookingValidationSchema>;