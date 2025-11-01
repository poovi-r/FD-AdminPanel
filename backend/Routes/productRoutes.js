import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../Controllers/productController.js";
import { admin, protect } from "../Middlewares/authMiddleware.js";


const router = express.Router();
router.use(protect, admin);


router.get("/all-products", getProducts);
router.post("/add", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
