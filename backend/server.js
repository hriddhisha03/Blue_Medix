require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const mongoose = require("./config/db");

const app = express();
const port = 5000;
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes")

app.use(cors());

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
mongoose();

// CRUD operations for users

// app.get("/users", async(req, res) => {
//     res.send("List users (pending)")
// })

// app.get("/users/:id", async(req, res) => {
//     res.json({ userId: req.params.id });
// });
  
// app.post("/users", async(req, res) => {
//     res.send("add user (pending)")
// })

// app.put("/users/:id", async(req, res) => {
//     res.send("Edit user (pending)")
// })
// app.delete("/users/:id", async(req, res) => {
//     res.send("delete user (pending)")
// })

app.listen(port, async () => { 
    console.log(`Server running on http://localhost:${port}`);
});
