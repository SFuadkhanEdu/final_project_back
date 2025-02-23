import { Router } from "express";
const router = Router();
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/categoryController.js";

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
