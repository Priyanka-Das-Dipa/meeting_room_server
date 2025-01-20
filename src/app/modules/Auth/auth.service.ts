/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import AppError from "../../errors/AppError";
import { TLogin, tokenPayload } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";

const signUpIntoDb = async (payLoad: TUser) => {
    // check use already exist
    const isUserExist = await User.findOne({ email: payLoad.email });
    if (isUserExist) {
      throw new AppError(status.ALREADY_REPORTED, "User already Exist. Please login");
    }
  
    const newUser = await User.create(payLoad);
  
    const tokenPayload: tokenPayload = {
      name: newUser?.name,
      email: newUser?.email,
      role: newUser?.role,
      profileImage: newUser?.profileImage,
      address: newUser?.address,
      phone: newUser?.phone,
    };
  
    const token = createToken(tokenPayload, config.access_token_secret as string, config.jwt_access_expire as string);
    return { newUser, token };
  };
  const loginDb = async (payLoad: TLogin) => {
    // check user exist
    const existingUser = await User.findOne({ email: payLoad.email });
  
    if (!existingUser) {
      throw new AppError(status.NOT_FOUND, `User not found with this ${payLoad.email}`);
    }
  
    const matched = await User.isPasswordMatched(payLoad.password, existingUser?.password);
  
    if (!matched) {
      throw new AppError(status.FORBIDDEN, "Password do not matched");
    }
  
    const tokenPayload: tokenPayload = {
      name: existingUser?.name,
      email: existingUser?.email,
      role: existingUser?.role,
      profileImage: existingUser?.profileImage,
      address: existingUser?.address,
      phone: existingUser?.phone,
    };
  
    const token = createToken(tokenPayload, config.access_token_secret as string, config.jwt_access_expire as string);
    const result = { existingUser, token };
    return result;
  };
  const getOneUserDb = async (email: any) => {
    return await User.findOne(email);
  };
  const makeAdminDb = async (id: string) => {
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      throw new AppError(status.NOT_FOUND, "User not found or role not matched");
    }
    if (userExist?.role === "user") {
      return await User.findByIdAndUpdate(id, { role: "admin" }, { new: true, runValidators: true });
    }
    if (userExist?.role === "admin") {
      return await User.findByIdAndUpdate(id, { role: "user" }, { new: true, runValidators: true });
    }
  };
  
  export const authServices = {
    signUpIntoDb,
    loginDb,
    makeAdminDb,
    getOneUserDb,
  };
  