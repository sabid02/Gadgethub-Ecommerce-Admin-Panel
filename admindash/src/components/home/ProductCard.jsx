import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import ProductSingleCard from "./ProductSingleCard";

const ProductCard = ({ products }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductSingleCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductCard;
