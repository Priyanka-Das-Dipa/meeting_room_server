import AppError from "../../errors/AppError";
import { Bookings } from "./booking.model";
import { bookingValidation } from "./booking.validation";
import { httpStatus } from "http-status";

const addRoomBooking = async () => {
  const result = await bookingValidation.create();
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
    throw new AppError(httpStatus.NOT_FOUND, "No Booking Found!");
  }
  const result = await Bookings.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};

export const bookingService = {
  addRoomBooking,
  getAllBookings,
  getSingleBooking,
  deleteBooking,
};
