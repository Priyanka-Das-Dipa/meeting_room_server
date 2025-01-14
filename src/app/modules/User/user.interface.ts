import { Model } from "mongoose";

export type TUserRole = "admin" | "user";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TUserRole;
  profileImage?: string;
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {}
