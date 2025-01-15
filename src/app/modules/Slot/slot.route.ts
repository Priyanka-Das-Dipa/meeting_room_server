import { Router } from "express";
import validationRequest from "../../middleWare/validationRequest";
import { slotValidation } from "./slot.validation";
import { slotController } from "./slot.controller";

const router = Router();

router.post(
  "/",
  validationRequest(slotValidation.addSlotValidationSchema),
  slotController.addSlot
);
router.get("/availability", slotController.getAllSlot);
router.delete("/delete/:id", slotController.deleteSlot);
router.delete("/delete-old-slots", slotController.deleteAllOldSlot);
router.patch("/update/:id", slotController.updateSlot);

export const slotRoute = router;
