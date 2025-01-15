import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

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


// password becrypt before save
UserModelSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_saltround));
  next();
});

// check password is matched
UserModelSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hashPassword: string) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const User = model<TUser, UserModel>("User", UserModelSchema);
