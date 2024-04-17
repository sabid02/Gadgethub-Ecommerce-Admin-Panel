import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use("/uploads", express.static("uploads"));

const corsOptions = {
  origin: ["http://localhost:5174", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("sabid");
});

app.use("/products", cors(corsOptions), productRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
