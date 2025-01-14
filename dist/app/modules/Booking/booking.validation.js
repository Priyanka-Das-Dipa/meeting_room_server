"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const bookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        paymentId: zod_1.z.string(),
        paymentTime: zod_1.z.number(),
        phone: zod_1.z.string(),
        room: zod_1.z.array(zod_1.z.object({
            _id: zod_1.z.string(),
            date: zod_1.z.string(),
            slots: zod_1.z.array(zod_1.z.string()),
        })),
        totalAmount: zod_1.z.number(),
        user: zod_1.z.string(),
        isConfirmed: zod_1.z.enum(["confirmed", "unconfirmed", "canceled"]),
    }),
});
exports.bookingValidation = {
    bookingValidationSchema,
};
