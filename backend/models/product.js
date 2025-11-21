// Initialize mongoose
const mongoose = require("mongoose");

// Define the schema for the product model
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: String,
    required: true,
  },
});

// Create the model for the product schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

