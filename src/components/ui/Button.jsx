import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button className="bg-lightNavy text-white py-2 px-4 rounded-sm hover:brightness-110 text-xs " onClick={onClick}>
      {text}
    </button>
  );
}
