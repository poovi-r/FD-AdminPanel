import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import dashboardRoutes from "./Routes/dashboardRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config();
console.log("Loaded ADMIN_CODE:", process.env.ADMIN_CODE);

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Database connection
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
