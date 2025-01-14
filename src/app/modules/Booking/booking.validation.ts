import { z } from "zod";

const bookingValidationSchema = z.object({
  body: z.object({
    room: z.string(),
    slots: z.string(),
    user: z.string(),
    email: z.string().email(),
    phone: z.string(),
    paymentTime: z.number(),
    paymentId: z.string(),
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]),
    totalAmount: z.number(),
  }),
});

export const bookingValidation = {
    bookingValidationSchema,
  };
