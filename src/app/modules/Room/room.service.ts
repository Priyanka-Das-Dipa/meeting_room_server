import QueryBuilder from "../../builder/QueryBuilder";
import { TRooms } from "./room.interface";
import { Rooms } from "./room.model";
import { searchAbleField } from "./searchAbleField";

const createRoom = async (payLoad: TRooms) => {
  const result = await Rooms.create(payLoad);
  return result;
};

const getAllRooms = async (query: Record<string, unknown>) => {
  // const result = await Rooms.find();
  const roomQuery = new QueryBuilder(Rooms.find({ isDeleted: false }), query)
    .search(searchAbleField)
    .filter()
    .sort()
    .limit()
    .paginate()
    .range()
    .capacity()
    .roomsId();
  const result = await roomQuery.modelQuery;
  const meta = await roomQuery.countTotal();
  return { result, meta };
};

const getASingleRoom = async (id: string) => {
  const result = await Rooms.findById(id);
  return result;
};

const updateRooms = async (id: string, payLoad: TRooms) => {
  const result = await Rooms.findByIdAndUpdate(id, payLoad, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteARoom = async (payload: string) => {
  const result = await Rooms.findByIdAndUpdate(
    payload,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const roomsServices = {
  createRoom,
  getAllRooms,
  getASingleRoom,
  updateRooms,
  deleteARoom,
};
