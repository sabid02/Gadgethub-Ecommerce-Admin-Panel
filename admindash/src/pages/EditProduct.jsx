import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { RiFolderUploadLine } from "react-icons/ri";

function EditProduct({ product }) {
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:7000/products/${id}`)
      .then((response) => {
        setImg(response.data.img);
        setCategory(response.data.category);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened, Please check console");
        navigate("/");
        console.error(error);
      });
  }, []);

  const handleEditProduct = () => {
    const formData = new FormData();
    formData.append("img", img);
    formData.append("category", category);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);

    setLoading(true);
    axios
      .put(`http://localhost:7000/products/${id}`, formData)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened, Please check console");
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Product</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Image</label>
          <div className="flex items-center">
            <input
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              className="hidden"
              id="fileInput"
            />
            {img && (
              <img
                src={`http://localhost:7000/${img}`}
                alt="Product Image"
                className="max-w-full max-h-200px"
              />
            )}

            <label
              htmlFor="fileInput"
              className="border-2 border-gray-500 px-4 py-2 cursor-pointer"
            >
              {img ? img.name : "Select Image"}
            </label>
            {img && (
              <button
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => setImg(null)}
              >
                Clear Picture
              </button>
            )}
            {img && img instanceof File && (
              <img
                src={URL.createObjectURL(img)}
                alt="Uploaded"
                className="my-2"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}
          </div>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="">Select a category</option>
            <option value="Camera">Camera</option>
            <option value="Phone">Phone</option>
            <option value="Laptop">Laptop</option>
            <option value="Desktop">Desktop</option>
            <option value="VR Box">VR Box</option>
            <option value="Processor">Processor</option>
            <option value="Smart Watch">Smart Watch</option>
            <option value="Projector">Projector</option>
          </select>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-4" onClick={handleEditProduct}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditProduct;
