import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, product: { id, image, title, category, price } }) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      className="rounded-lg shadow-md overflow-hidden cursor-pointer dark:bg-gray-600 dark:text-white"
    >
      <div className="overflow-hidden">
        <img className="w-full hover:scale-110 transition-transform ease-in-out duration-500" src={image} alt={title} />
      </div>
      <div className="mt-2 px-2 text-lg flex flex-wrap justify-between items-center">
        <h3 className="truncate">{title}</h3>
        <p className="pr-4 ml-auto">{`￦${price}`}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
  );
}
