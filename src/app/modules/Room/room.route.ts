import { Router } from "express";
import { roomController } from "./room.controller";

const router = Router();

router.post("/", roomController.createRoom);
router.get("/", roomController.getAllRoom);
router.get("/:id", roomController.getASingleRoom);
router.delete("/:id", roomController.deleteARoom);

export const roomRoutes = router;
