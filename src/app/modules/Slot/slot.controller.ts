import status from "http-status";
import catchAsync from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { slotService } from "./slot.service";

const addSlot = catchAsync(async (req, res) => {
  const result = await slotService.addASlot(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All Slots created successfully",
    data: result,
  });
});

const getAllSlot = catchAsync(async (req, res) => {
  const result = await slotService.getAllSlot();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});
const deleteSlot = catchAsync(async (req, res) => {
  const result = await slotService.deleteASlot(req?.params?.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Slot Deleted Successful",
    data: result,
  });
});
const updateSlot = catchAsync(async (req, res) => {
  const result = await slotService.updateASlot(req?.params?.id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Slot Updated successfully",
    data: result,
  });
});
const deleteAllOldSlot = catchAsync(async (req, res) => {
  await slotService.deleteALLOldSlot;
});
export const slotController = {
  addSlot,
  getAllSlot,
  deleteSlot,
  updateSlot,
  deleteAllOldSlot,
};
