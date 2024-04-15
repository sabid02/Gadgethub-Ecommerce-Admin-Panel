import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { TbFileDescription } from "react-icons/tb";
import { MdOutlinePriceChange } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useState } from "react";
import ProductModal from "./ProductModal";

import React from "react";

const ProductSingleCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
      <h4 className="my-2 text-gray-500">{product._id}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <CiImageOn className="text-red-300 text-2xl" />
        <h2 className="my-1">{product.img}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <BiCategory className="text-red-300 text-2xl" />
        <h2 className="my-1">{product.category}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <MdDriveFileRenameOutline className="text-red-300 text-2xl" />
        <h2 className="my-1">{product.title}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <TbFileDescription className="text-red-300 text-2xl" />
        <h2 className="my-1">{product.description}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <MdOutlinePriceChange className="text-red-300 text-2xl" />
        <h2 className="my-1">{product.price}</h2>
      </div>
      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <BiShow
          className="text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/products/details/${product._id}`}>
          <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
        </Link>
        <Link to={`/products/edit/${product._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link to={`/products/delete/${product._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>
      </div>
      {showModal && (
        <ProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ProductSingleCard;
