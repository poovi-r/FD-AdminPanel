import express from "express";
import { getDashboardSummary } from "../controllers/dashboardController.js";
import { admin, protect } from "../Middlewares/authMiddleware.js";


const router = express.Router();

router.use(protect, admin);

router.get("/", getDashboardSummary);

export default router;
