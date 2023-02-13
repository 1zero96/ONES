import React, { useState } from "react";
import Products from "../components/Products";
export default function AllProducts() {
  const selectList = ["All", "TOP", "BOTTOM", "OUTER", "SHOES"];
  const [selected, setSelected] = useState("All");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  return (
    <section className="dark:bg-black dark:text-white">
      <h3 className="py-5 text-lg text-center">
        <span className="font-bold">[{selected}]</span> PRODUCT
      </h3>
      <div className="flex justify-center">
        <select onChange={handleSelect} value={selected} className="dark:bg-black dark:text-white">
          {selectList.map((list, index) => (
            <option key={index}>{list}</option>
          ))}
        </select>
      </div>
      <Products category={selected} />
    </section>
  );
}
