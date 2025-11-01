import express from "express";
import { cancelOrder, createOrder,  getOrders, updateOrderStatus } from "../Controllers/orderController.js";

const router = express.Router();

router.get("/all-orders", getOrders);
router.post("/add", createOrder);
router.put("/update-status/:id", updateOrderStatus);
router.put("/cancel/:id", cancelOrder);

export default router;
