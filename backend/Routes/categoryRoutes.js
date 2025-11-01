import express from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController.js";
import { admin, protect } from "../Middlewares/authMiddleware.js";


const router = express.Router();

router.use(protect, admin);

router.get("/all-categories", getCategories);
router.post("/add", createCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
