import { Router } from "express";
const router = Router();
import {registerUser, loginUser, getAllUsers, getUserById, getUserByUserName, getUserBySelf } from "../controllers/userController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.get("/users/username/:username",getUserByUserName)
router.get("/users/self",getUserBySelf)
router.get("/users/:id", getUserById);


export default router;
