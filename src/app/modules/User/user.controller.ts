import catchAsync from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
import httpStatus from "http-status";

// get all users from the database
const getAllUsers = catchAsync(async (req, res) => {
    const result = await userServices.getAllUsers(req.query);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "All Users successfully from Database!",
      data: result,
    });
  });

  // delete a user from the database 
  const deleteUser = catchAsync(async (req, res) => {
    const result = await userServices.deleteUser(req?.params?.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Deleted successfully from Database!",
      data: result,
    });
  });
  export const userController = {
    getAllUsers,
    deleteUser,
  };