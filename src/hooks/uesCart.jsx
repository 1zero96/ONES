import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateToCart, getCart, removeFromCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery(["carts", uid || ""], () => getCart(uid), {
    // 사용자가 없는 경우, uid가 false 인 경우 쿼리가 실행되지 않도록 함
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation((product) => addOrUpdateToCart(uid, product), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  });

  const removeItem = useMutation((id) => removeFromCart(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
