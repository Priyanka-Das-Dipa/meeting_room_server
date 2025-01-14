import express from "express"

const router = express.Router();

router.get("/",  userController.getAllUsers);
router.delete("/:id",  userController.deleteUser);

export const userRouters = router;