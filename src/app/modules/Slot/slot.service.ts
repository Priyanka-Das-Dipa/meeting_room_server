import AppError from "../../errors/AppError";
import { TSlot } from "./slot.interface";
import httpStatus from "http-status";
import { checkSlotExist, createSlots, generateSlot } from "./slot.utils";
import mongoose from "mongoose";
import { Slot } from "./slot.modal";

const addASlot = async (payload: TSlot) => {
  const createSlotTime = await generateSlot(
    payload?.startTime,
    payload?.endTime
  );

  // check slot time is available
  const slotExist = await checkSlotExist(
    payload.room,
    payload.date,
    createSlotTime
  );

  if (slotExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "One or more slots already exist within the specified time range."
    );
  }
  return await createSlots(payload.room, payload.date, createSlotTime);
};

// old slot delete and create 5 slot each month 10 date automatically
const getAllSlot = async () => {
  const result = await Slot.find().populate("room").sort("room");
  return result;
};

// delete slot
const deleteASlot = async (payload: string) => {
  // check slot is exist
  const isExist = await Slot.findById(payload);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot Not found for delete");
  }
  const result = await Slot.deleteOne({ _id: payload });
  return result;
};
// delete all old slot
const deleteALLOldSlot = async () => {
  // check slot is exist
  const today = new Date();
  // set all time 0 like hour, minutes, seconds, milliseconds
  today.setHours(0, 0, 0, 0);
  // const available = await Slot.find({ date: { $lt: today }, isBooked: false });
  await Slot.deleteMany({ date: { $lt: today }, isBooked: false });

  // Generate the slot times, e.g., 10:00 and 15:00
  const createSlotTime = await generateSlot("10:00", "15:00");
  // Set the date to the 15th of the current month
  const now = new Date();
  const fifteenthOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 15);
  const roomId = new mongoose.Types.ObjectId("66d32f64c7529009f28cebd0"); //create dynamic slot for pinnacle room every month
  // Check if the slot already exists on the 15th
  const slotExist = await Slot.find({
    room: roomId,
    date: { $lte: fifteenthOfMonth },
    isBooked: false,
  });
  if (slotExist.length) {
    throw new AppError(
      httpStatus.CONFLICT,
      "One or more slots already exist within the specified time range."
    );
  } else {
    // Create the slot if it doesn't exist
    await createSlots(roomId, fifteenthOfMonth, createSlotTime);
  }
};
// update slot
const updateASlot = async (id: string, payload: TSlot) => {
  // check updatable slot exist
  const isExistRequestedSlot = await Slot.findById(id);
  if (!isExistRequestedSlot) {
    throw new AppError(httpStatus.NOT_FOUND, "This Slot is not Exist");
  }
  // empty array for created slots
  const comingSlots = [];
  if (payload.startTime && payload.endTime) {
    comingSlots.push({
      startTime: payload.startTime,
      endTime: payload.endTime,
    });
    // check the slot schedule is available
    const slotNotExist = await checkSlotExist(
      payload.room,
      payload.date,
      comingSlots
    );
    if (slotNotExist) {
      throw new AppError(httpStatus.CONFLICT, "Slot Time is not available");
    }
  }
  const result = await Slot.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const slotService = {
  addASlot,
  getAllSlot,
  deleteASlot,
  updateASlot,
  deleteALLOldSlot,
};
