import express from "express";
import { Product } from "../models/productModel.js";
import multer from "multer";

const router = express.Router();

//Routes to save product
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname); // Use original filename
  },
});
const upload = multer({ storage: storage });

// Route to save product with file upload
router.post("/", upload.single("img"), async (request, response) => {
  console.log(request.file, request.body, 16);
  try {
    if (
      !request.body.category ||
      !request.body.title ||
      !request.body.description ||
      !request.body.price ||
      !request.body.label
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: category, image, description, price",
      });
    }
    const newProduct = {
      category: request.body.category,
      img: request.file.path,
      title: request.body.title,
      description: request.body.description,
      price: request.body.price,
      label: request.body.label,
    };

    const product = await Product.create(newProduct);

    return response.status(201).send(product);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Routes to get all product
router.get("/", async (request, response) => {
  try {
    const products = await Product.find({});

    return response.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Routes to get  product by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const product = await Product.findById(id);

    return response.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Routes to update product by id
router.put("/:id", upload.single("img"), async (request, response) => {
  try {
    const { id } = request.params;

    // Check if any required field is missing
    if (
      !request.body.category ||
      !request.body.title ||
      !request.body.description ||
      !request.body.price ||
      !request.body.label
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: category, title, description, price, label",
      });
    }

    const updatedProduct = {
      category: request.body.category,
      img: request.file.path,
      title: request.body.title,
      description: request.body.description,
      price: request.body.price,
      label: request.body.label,
    };

    // If image is uploaded, update the img field
    if (request.file) {
      updatedProduct.img = request.file.path;
    }

    const result = await Product.findByIdAndUpdate(id, updatedProduct);

    if (!result) {
      return response.status(404).send({
        message: "Product not found",
      });
    }

    return response
      .status(200)
      .send({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Routes to delete product by id
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Product.findByIdAndDelete(id, request.body);

    if (!result) {
      return response.status(404).send({
        message: "Product not found",
      });
    }

    return response
      .status(200)
      .send({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
