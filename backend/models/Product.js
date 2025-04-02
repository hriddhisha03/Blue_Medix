const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    validate: {
      validator: (value) => !/^\d/.test(value), 
      message: "Title should not start with a number",
    },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"], 
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["electronics", "jewelery", "men's clothing", "women's clothing"], 
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [20, "Description must be at least 20 characters long"], 
  },
  image: {
    type: String,
    required: [true, "Image URL is required"],
    validate: {
        validator: (value) => /^(http|https):\/\/.+\..+/.test(value), 
      message: "Image must be a valid URL ending with an image format (png, jpg, jpeg, gif, webp, svg)",
    },
  },
});

module.exports = mongoose.model('Product', productSchema);;
