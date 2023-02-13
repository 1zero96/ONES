import React, { useState } from "react";
import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";
import Swal from "sweetalert2";
import useProducts from "../hooks/useProducts";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const { addProduct } = useProducts();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setTimeout(() => {
                Swal.fire({
                  title: "제품 등록 완료!",
                  text: "제품을 성공적으로 추가하였습니다.",
                  imageUrl: url,
                  imageWidth: 300,
                  imageHeight: 400,
                  imageAlt: product.title,
                });
              }, 1000);
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
  };
  return (
    <section className={file ? "w-full text-center h-full" : "w-full text-center h-screen"}>
      <h2 className="text-2xl font-bold mt-7 mb-5 ">상품 등록하기</h2>
      {file && <img className="w-96 mx-auto mb-2" src={URL.createObjectURL(file)} alt="local file" />}
      <form className="flex flex-col px-14 border-y py-5" onSubmit={handleSubmit}>
        <input type="file" accept="image/*" name="file" required onChange={handleChange} />
        <input type="text" name="title" value={product.title ?? ""} placeholder="제품명" required onChange={handleChange} />
        <input type="number" name="price" value={product.price ?? ""} placeholder="가격" required onChange={handleChange} />
        <input
          type="text"
          name="category"
          value={product.category ?? ""}
          placeholder="카테고리: (TOP, BOTTOM, OUTER, SHOES)"
          required
          onChange={handleChange}
        />
        <input type="text" name="description" value={product.description ?? ""} placeholder="제품 설명" required onChange={handleChange} />
        <input className="mb-4" type="text" name="options" value={product.options ?? ""} placeholder="사이즈: (S, M, L, XL)" required onChange={handleChange} />
        <Button text={isUploading ? "업로드중..." : "제품 등록하기"} disabled={isUploading} />
      </form>
    </section>
  );
}
