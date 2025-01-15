import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "./user.model";

// get all the user form the database

const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find({ isDeleted: false }), query).search(["role", "name"]).filter().sort();
  const result = await userQuery.modelQuery;
  return result;
};


// Delete the user from database

const deleteUser = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isDeleted: true });
};

export const userServices = {
  getAllUsers,
  deleteUser,
};
