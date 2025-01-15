"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotRoute = void 0;
const express_1 = require("express");
const validationRequest_1 = __importDefault(require("../../middleWare/validationRequest"));
const slot_validation_1 = require("./slot.validation");
const slot_controller_1 = require("./slot.controller");
const router = (0, express_1.Router)();
router.post("/", (0, validationRequest_1.default)(slot_validation_1.slotValidation.addSlotValidationSchema), slot_controller_1.slotController.addSlot);
router.get("/availability", slot_controller_1.slotController.getAllSlot);
router.delete("/delete/:id", slot_controller_1.slotController.deleteSlot);
router.delete("/delete-old-slots", slot_controller_1.slotController.deleteAllOldSlot);
router.patch("/update/:id", slot_controller_1.slotController.updateSlot);
exports.slotRoute = router;
