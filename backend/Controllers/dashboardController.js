import Category from "../Models/categoryModel.js";
import Order from "../Models/orderModel.js";
import Product from "../Models/productModel.js";
import User from "../Models/userModel.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const [totalUsers, totalCategories, totalProducts] = await Promise.all([
      User.countDocuments(),
      Category.countDocuments(),
      Product.countDocuments(),
    ]);

    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] },
          },
          deliveredOrders: {
            $sum: { $cond: [{ $eq: ["$status", "Delivered"] }, 1, 0] },
          },
        },
      },
    ]);

    const orderSummary = orders[0] || {
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      deliveredOrders: 0,
    };

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      dashboardData: {
        totalUsers,
        totalCategories,
        totalProducts,
        totalOrders: orderSummary.totalOrders,
        totalRevenue: orderSummary.totalRevenue,
        pendingOrders: orderSummary.pendingOrders,
        deliveredOrders: orderSummary.deliveredOrders,
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
