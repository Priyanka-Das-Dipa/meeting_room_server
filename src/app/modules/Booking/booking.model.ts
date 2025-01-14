import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";


const bookingModelSchema = new Schema<TBooking>({
    email: { type: String, required: true },
    paymentId: { type: String, required: true },
    paymentTime: { type: Number, required: true },
    phone: { type: String, required: true },
    room: { type: String, required: true },
    slots: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    isConfirmed: { type: String, enum: ["confirmed", "unconfirmed", "canceled"], default: "unconfirmed" },
    isDeleted: { type: Boolean, default: false },
  });
  
  export const Bookings = model<TBooking>("Bookings", bookingModelSchema);