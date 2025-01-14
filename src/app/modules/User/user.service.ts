import { User } from "./user.model";

// get all the user form the database

const getAllUsers = async (query: Record<string, unknown>) => {
  const { role, name, sortBy, sortOrder } = query;

  let userQuery = User.find({ isDeleted: false });
  // Search by role and name
  if (role) {
    userQuery = userQuery.where("role").equals(role);
  }
  if (name) {
    userQuery = userQuery.where("name").regex(new RegExp(name as string, "i")); // Case-insensitive search
  }
  // Sort
  if (sortBy && sortOrder) {
    const sortDirection = sortOrder === "desc" ? -1 : 1;
    userQuery = userQuery.sort({ [sortBy as string]: sortDirection });
  }

  const result = await userQuery;
  return result;
};


// Delete the user from the database

const deleteUser = async (id: string) => {
  return await User.findByIdAndUpdate(id, { isDeleted: true });
};

export const userServices = {
  getAllUsers,
  deleteUser,
};
