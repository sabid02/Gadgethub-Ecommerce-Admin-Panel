import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
function DeleteProduct() {
  const [loading, setLoading] = useState("false");
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteProduct = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:7000/products/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened, Please check console");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Product</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are You Sure You want to delete this Product?
        </h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteProduct}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
}

export default DeleteProduct;
