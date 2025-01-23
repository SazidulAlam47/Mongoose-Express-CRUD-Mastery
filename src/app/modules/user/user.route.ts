import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.get("/", userControllers.getAllUsers);
router.get("/:userId", userControllers.getUserById);

router.post("/", userControllers.createUser);

router.put("/:userId", userControllers.updateUser);
router.put("/:userId/orders", userControllers.addProductToUser);

router.delete("/:userId", userControllers.deleteUser);

export const UserRoutes = router;
