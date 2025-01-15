import catchAsync from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { roomsServices } from "./room.service";


// create a room in Database

const createRoom = catchAsync(async (req, res) => {
  const result = await roomsServices.createRoom(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room added successfully",
    data: result,
  });
});

// get all room from Database

const getAllRoom = catchAsync(async (req, res) => {
  const result = await roomsServices.getAllRooms(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rooms retrieved successfully",
    data: result,
  });
});


// get a room from Database

const getASingleRoom = catchAsync(async (req, res) => {
  const result = await roomsServices.getASingleRoom(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room retrieved successfully",
    data: result,
  });
});


const updateARoom = catchAsync(async (req, res) => {
  const result = await roomsServices.updateRooms(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room updated successfully",
    data: result,
  });
});

// Delete a Room from the Database

const deleteARoom = catchAsync(async (req, res) => {
    const result = await roomsServices.deleteARoom(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Room deleted successfully",
      data: result,
    });
  });

  
export const roomController = {
  createRoom,
  getAllRoom,
  getASingleRoom,
  updateARoom,
  deleteARoom
};
