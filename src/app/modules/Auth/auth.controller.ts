import status from "http-status";
import catchAsync from "../../utils/catchAsynch";
import { authServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const signUp = catchAsync(async (req, res) => {
  const result = await authServices.signUpIntoDb(req.body);
  console.log(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
// login
const login = catchAsync(async (req, res) => {
  const result = await authServices.loginDb(req.body);
  res.status(status.OK).json({
    success: true,
    statusCode: status.OK,
    message: "User logged in successfully",
    token: result?.token,
    data: result?.existingUser,
  });
});
const getOneUser = catchAsync(async (req, res) => {
  const result = await authServices.getOneUserDb(req.query);
  res.status(status.OK).json({
    success: true,
    statusCode: status.OK,
    message: "User got successfully",
    data: result,
  });
});
const makeAdmin = catchAsync(async (req, res) => {
  const result = await authServices.makeAdminDb(req.params.id);
  res.status(status.OK).json({
    success: true,
    statusCode: status.OK,
    message: "User Successfully Promototed to admin",
    data: result,
  });
});
export const authController = {
  signUp,
  login,
  makeAdmin,
  getOneUser,
};
