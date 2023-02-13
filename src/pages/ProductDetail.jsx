import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import useCart from "../hooks/uesCart";
import Swal from "sweetalert2";

export default function ProductDetail() {
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        Swal.fire("", "장바구니에 추가되었습니다.", "success");
      },
    });
  };
  return (
    <section className="py-5 md:py-10">
      <p className="mx-8 mt-4 font-bold text-gray-600">[{category}]</p>
      <section className="flex flex-col md:flex-row p-4 w-screen max-w-7xl">
        <img className="w-full md:w-4 px-4 basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-center text-2xl lg:text-3xl  font-bold py-2 text-lightNavy">{title}</h2>
          <p className="text-xl lg:text-2xl text-right px-5 md:px-0 font-bold py-2 border-b border-gray-400">￦{price}</p>
          <p className="py-4 text-base px-2 lg:text-lg">{description}</p>
          <div className="flex items-center">
            <label className="text-brand font-bold" htmlFor="select">
              사이즈 :
            </label>
            <select className="p-2 m-4 flex-1 border-2 outline-none dark:text-gray-600" onChange={handleSelect} value={selected}>
              {options && options.map((option, index) => <option key={index}>{option}</option>)}
            </select>
          </div>
          <Button text="장바구니에 추가" onClick={handleClick} />
        </div>
      </section>
    </section>
  );
}
