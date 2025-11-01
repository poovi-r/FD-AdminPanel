import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please enter category name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter category description"],
    trim: true,
  },
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);
export default Category;
