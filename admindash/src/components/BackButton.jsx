import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

import React from "react";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <div className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit">
        <Link to={destination}>
          <BsArrowLeft className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default BackButton;
