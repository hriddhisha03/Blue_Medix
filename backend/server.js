require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const mongoose = require("./config/db");

const app = express();
const port = 5000;
const userRoutes = require("./routes/userRoutes");
// const productRoutes = require("./routes/productRoutes");
app.use(cors());
// app.use("/api/products", productRoutes);
app.use(express.json());
app.use("/api/users", userRoutes);
mongoose();

// get /products -> View list of products
// get /products:id -> View product
// post /products -> Add new product
// put /products:id -> Update product
// delete /products:id -> delete product

// get /users
// get /users:id
// post /users 
// put /users:id
// delete /users:id -> delete user

app.get("/test", (req, res) => {
    res.send("Hello");
  });

// CRUD Operations for products
app.get("/products", (req, res) => {
    res.send("List products (pending)")
})

app.get("/products/:id", (req, res) => {
    res.send("List product (pending)")
})
  
app.post("/products", (req, res) => {
    res.send("add product (pending)")
})

app.put("/products/:id", (req, res) => {
    res.send("Edit product (pending)")
})
app.delete("/products/:id", (req, res) => {
    res.send("delete product (pending)")
})

// CRUD operations for users

app.get("/users", async(req, res) => {
    res.send("List users (pending)")
})

app.get("/users/:id", async(req, res) => {
    res.json({ userId: req.params.id });
});
  
app.post("/users", async(req, res) => {
    res.send("add user (pending)")
})

app.put("/users/:id", async(req, res) => {
    res.send("Edit user (pending)")
})
app.delete("/users/:id", async(req, res) => {
    res.send("delete user (pending)")
})

app.listen(port, async () => { 
    console.log(`Server running on http://localhost:${port}`);
});
