import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please enter your email"],
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  mobile:{
    type: String,
    unique: true,
    required: [true, "Please enter your mobile number"],
    minlength: [10, "Mobile number must be at least 10 digits"],
    maxlength: [15, "Mobile number must be at most 15 digits"],
    trim: true,
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
