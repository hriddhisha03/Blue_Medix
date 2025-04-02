const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const connectDB = require("./config/db"); 
const Product = require("./models/Product"); 

const populateProducts = async () => {
  try {
    await connectDB();

    console.log("Fetching products from FakeStoreAPI...");
    const { data } = await axios.get("https://fakestoreapi.com/products");

    const products = data.map((item) => ({
      title: item.title,
      price: item.price,
      category: item.category,
      description: item.description,
      image: item.image,
    }));

    await Product.insertMany(products);
    console.log("Products populated successfully!");

    mongoose.connection.close(); 
  } catch (err) {
    console.error("Populating error:", err);
    mongoose.connection.close();
  }
};

populateProducts();
