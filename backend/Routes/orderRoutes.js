import express from "express";
import { cancelOrder, createOrder,  getOrders, updateOrderStatus } from "../Controllers/orderController.js";
import { admin, protect } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect, admin);

router.get("/all-orders", getOrders);
router.post("/add", createOrder);
router.put("/update-status/:id", updateOrderStatus);
router.put("/cancel/:id", cancelOrder);

export default router;
