import { Router } from "express";
const router = Router();
import { createUser, updateUser, deleteUser, logoutUser, getRole } from "../controllers/userController.js";
import { verificationOfAuthority } from "../services/verificationOfAuthority.js";
import { verifyToken } from "../services/tokenVerification.js";

router.post("/users",verificationOfAuthority, createUser);
router.put("/users/:id",verificationOfAuthority, updateUser);
router.delete("/users/:id",verificationOfAuthority, deleteUser);
router.post("/logout",verifyToken, logoutUser);
router.get("/role",verifyToken,getRole)

export default router;