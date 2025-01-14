import { TRooms } from "./room.interface";
import { Rooms } from "./room.model";

const createRoom = async (payLoad: TRooms) => {
  const result = await Rooms.create(payLoad);
  return result;
};

// const getAllRoom = async (query: Record<string, unknown>) => {
//     // const result = await Rooms.find();
//     const roomquery = new Query(Rooms.find({ isDeleted: false }), query)
     
//     const result = await roomquery.modelQuery;
//     const meta = await roomquery.countTotal();
   
//     return result;
//   };

const getASingleRoom = async (id: string) => {
  const result = await Rooms.findById(id);
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
  getASingleRoom,
  deleteARoom,
};
