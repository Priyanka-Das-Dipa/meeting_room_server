"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const validationRequest_1 = __importDefault(require("../../middleWare/validationRequest"));
const user_validation_1 = require("../User/user.validation");
const auth_controller_1 = require("./auth.controller");
const express_1 = __importDefault(require("express"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/signup", (0, validationRequest_1.default)(user_validation_1.userValidations.createUserValidationSchema), auth_controller_1.authController.signUp);
router.get("/users", auth_controller_1.authController.getOneUser);
router.post("/login", (0, validationRequest_1.default)(auth_validation_1.authValidation.loginValidationSchema), auth_controller_1.authController.login);
router.put("/status/:id", auth_controller_1.authController.makeAdmin);
exports.authRoutes = router;
