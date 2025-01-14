import catchAsync from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./booking.service";
import httpStatus from "http-status";

const addBooking = catchAsync(async (req, res) => {
  const result = await bookingService.addRoomBooking(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your Booking has been received.",
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await bookingService.getAllBookings();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const result = await bookingService.getSingleBooking(req?.user?.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const result = await bookingService.deleteBooking(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking deleted successfully",
    data: result,
  });
});

export const bookingController = {
  addBooking,
  getAllBooking,
  getSingleBooking,
  deleteBooking,
};
