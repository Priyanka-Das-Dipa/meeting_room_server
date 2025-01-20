import validationRequest from "../../middleWare/validationRequest";
import { userValidations } from "../User/user.validation";
import { authController } from "./auth.controller";
import express from "express";
import { authValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validationRequest(userValidations.createUserValidationSchema),
  authController.signUp
);

router.get("/users", authController.getOneUser);

router.post(
  "/login",
  validationRequest(authValidation.loginValidationSchema),
  authController.login
);

router.put("/status/:id", authController.makeAdmin);

export const authRoutes = router;
