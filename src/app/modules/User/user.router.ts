import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);
// router.post("/",  userController.getAllUsers);
router.delete("/:id", userController.deleteUser);

export const userRouters = router;
