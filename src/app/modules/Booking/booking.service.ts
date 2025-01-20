/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";
import { Bookings } from "./booking.model";

import Stripe from "stripe";
import config from "../../config";

const stripe = new Stripe(config.stripe_secret_key as any);
const addRoomBooking = async (payload: TBooking) => {
  const result = await Bookings.create(payload);
  return result;
};

const getAllBookings = async () => {
  const result = await Bookings.find({ isDeleted: false })
    .populate({
      path: "room",
      populate: { path: "_id slots" },
    })
    .populate("user");
  return result;
};

const getSingleBooking = async (payload: string) => {
  const userData = await Bookings.find({ email: payload, isDeleted: false })
    .populate({
      path: "room",
      populate: { path: "_id slots" },
    })
    .populate("user");

  return userData;
};

const deleteBooking = async (id: string) => {
  const isExist = await Bookings.findById(id);
  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "No Booking Found!");
  }
  const result = await Bookings.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};

const confirmBooking = async (id: string, payload: { status: string }) => {
  console.log(payload);
  const result = await Bookings.findByIdAndUpdate(
    id,
    { isConfirmed: payload.status },
    { new: true, runValidators: true }
  );
  return result;
};

const confiremPayment = async (payload: {
  paymentId: string;
  total: number;
}) => {
  const { paymentId, total } = payload;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "usd",
    payment_method: paymentId,
    confirm: true,
    // return_url: `${config.CLIENT_SITE_URL}/success`,
  });
  return paymentIntent;
};

export const bookingService = {
  addRoomBooking,
  getAllBookings,
  getSingleBooking,
  deleteBooking,
  confirmBooking,
  confiremPayment,
};
