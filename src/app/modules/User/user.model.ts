import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";

const UserModelSchema = new Schema<TUser, UserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  address: { type: String, required: true },
  profileImage: { type: String, default: "" },
  isDeleted: { type: Boolean, default: false, select: 0 },
});

export const User = model<TUser, UserModel>("User", UserModelSchema);
