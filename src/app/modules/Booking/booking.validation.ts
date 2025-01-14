import { z } from "zod";

const bookingValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    paymentId: z.string(),
    paymentTime: z.number(),
    phone: z.string(),
    room: z.array(
      z.object({
        _id: z.string(),
        date: z.string(), 
        slots: z.array(z.string()), 
      })
    ),
    totalAmount: z.number(),
    user: z.string(),
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]),
  }),
});

export const bookingValidation = {
  bookingValidationSchema,
};
