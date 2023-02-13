import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts as fetchProducts, addNewProduct } from "../api/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(["products"], fetchProducts, { staleTime: 1000 * 60 });

  const addProduct = useMutation(({ product, url }) => addNewProduct(product, url), {
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  return { productsQuery, addProduct };
  // 커스텀 훅 사용하는 사람이 두 가지 다 사용 할 수 있도록 설정함
}
