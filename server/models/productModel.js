import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
