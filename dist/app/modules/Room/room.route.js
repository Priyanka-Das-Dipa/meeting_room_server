"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRoutes = void 0;
const express_1 = require("express");
const room_controller_1 = require("./room.controller");
const validationRequest_1 = __importDefault(require("../../middleWare/validationRequest"));
const room_validation_1 = require("./room.validation");
const router = (0, express_1.Router)();
router.post("/", (0, validationRequest_1.default)(room_validation_1.roomValidation.createRoomsValidationSchema), room_controller_1.roomController.createRoom);
router.get("/", room_controller_1.roomController.getAllRoom);
router.get("/:id", room_controller_1.roomController.getASingleRoom);
router.put("/:id", (0, validationRequest_1.default)(room_validation_1.roomValidation.updateRoomsValidationSchema), room_controller_1.roomController.updateARoom);
router.delete("/:id", room_controller_1.roomController.deleteARoom);
exports.roomRoutes = router;
