import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please select a category for the product"]
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
