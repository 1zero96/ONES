import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import useCart from "../hooks/uesCart";

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();
  return (
    <div className="relative">
      <HiOutlineShoppingBag className="text-xl" />
      {products && products.length > 0 && (
        <p className="w-4 h-4 text-center bg-lightNavy text-xs text-white font-bold rounded-full absolute -top-1 -right-2">{products.length}</p>
      )}
    </div>
  );
}
