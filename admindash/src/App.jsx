import { useState } from "react";
import CreateProduct from "./pages/CreateProduct";
import DeleteProduct from "./pages/DeleteProduct";
import EditProduct from "./pages/EditProduct";
import ShowProduct from "./pages/ShowProduct";
import Home from "./pages/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/create" element={<CreateProduct />} />
      <Route path="/products/delete/:id" element={<DeleteProduct />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
      <Route path="/products/details/:id" element={<ShowProduct />} />
    </Routes>
  );
}

export default App;
