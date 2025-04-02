const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
    match: [/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["male", "female", "other"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  role: {
    type: String,
    default: "isCustomer",
    enum: ["isCustomer", "isAdmin", "isSeller"],
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
