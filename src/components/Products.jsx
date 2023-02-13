import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";

export default function Products({ category }) {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  const filterProducts = products?.filter((item) => {
    return item.category === category;
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4 dark:bg-black dark:text-white">
        {category === "All" && products && products.map((product) => <ProductCard key={product.id} product={product} />)}
        {category !== "All" && filterProducts && filterProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        {category === "NEW" && products && products.map((product) => <ProductCard key={product.id} product={product} />)}
      </ul>
    </>
  );
}

// const filter = products.filter((products) => products.category === category);
