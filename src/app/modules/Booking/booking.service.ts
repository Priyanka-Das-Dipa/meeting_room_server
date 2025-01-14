import { bookingValidation } from "./booking.validation";

const addRoomBooking = async () => {
  const result = await bookingValidation.create();
  return result;
};

const getAllBookings = async () => {};

const getSingleBooking = async () => {};

const deleteBooking = async () => {};

export const bookingService = {
  addRoomBooking,
  getAllBookings,
  getSingleBooking,
  deleteBooking,
};
