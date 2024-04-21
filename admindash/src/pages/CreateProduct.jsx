import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { RiFolderUploadLine } from "react-icons/ri";

const CreateProduct = () => {
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSaveProduct = () => {
    const formData = new FormData();
    formData.append("img", img);
    formData.append("category", category);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("label", label);

    setLoading(true);
    axios
      .post("http://localhost:7000/products", formData)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        setError("An error occurred. Please check console.");
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Product</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Image</label>
          <input
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {img ? (
            <img
              src={URL.createObjectURL(img)}
              alt="Uploaded"
              className="my-2"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          ) : (
            <RiFolderUploadLine className="max-w-full max-h-200px" />
          )}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="">Select a category</option>
            <option value="camera">Camera</option>
            <option value="phone">Phone</option>
            <option value="laptop">Laptop</option>
            <option value="desktop">Desktop</option>
            <option value="vrbox">VR Box</option>
            <option value="processor">Processor</option>
            <option value="smartwatch">Smart Watch</option>
            <option value="projector">Projector</option>
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
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Label</label>
          <select
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="">Select a Label</option>
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
        <button className="p-2 bg-sky-300 m-4" onClick={handleSaveProduct}>
          Save
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default CreateProduct;
