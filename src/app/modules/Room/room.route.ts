import { Router } from "express";
import { roomController } from "./room.controller";
import validationRequest from "../../middleWare/validationRequest";
import { roomValidation } from "./room.validation";

const router = Router();

router.post("/", validationRequest(roomValidation.createRoomsValidationSchema), roomController.createRoom);
router.get("/", roomController.getAllRoom);
router.get("/:id", roomController.getASingleRoom);
router.put("/:id", validationRequest(roomValidation.updateRoomsValidationSchema), roomController.updateARoom);
router.delete("/:id", roomController.deleteARoom);

export const roomRoutes = router;
