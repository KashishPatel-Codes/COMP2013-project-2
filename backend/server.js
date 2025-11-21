// Initiate the server and connect to the database
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Product = require("./models/product");

const port = process.env.PORT || 3000;

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors()); // Enable CORS for all requests

// Connect to MongoDB and start server
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error.message);
  });

// Routes

// Root route
server.get("/", (req, res) => {
  res.send("Live");
});

// Get all products
server.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new product
server.post("/add-product", async (req, res) => {
  const { id, productName, brand, image, price } = req.body;
  const newProduct = new Product({ id, productName, brand, image, price });

  try {
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product by _id or id
server.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { productName, brand, image, price } = req.body;

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Product.findByIdAndUpdate(id, { productName, brand, image, price });
    } else {
      await Product.findOneAndUpdate({ id }, { productName, brand, image, price });
    }
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Delete product by _id or id
server.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Product.findByIdAndDelete(id);
    } else {
      await Product.findOneAndDelete({ id });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
