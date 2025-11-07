import { cartStorage } from "@/lib/storage";
import { CartItem } from "@/lib/types";
import { useEffect, useState } from "react";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = await cartStorage.getCart();
      setCart(cartData);
      setIsLoaded(true);
    };

    fetchCartData();
  }, []);

  const addItem = async (item: CartItem) => {
    cartStorage.addItem(item);
    const updatedCart = await cartStorage.getCart();
    setCart(updatedCart);
  };

  const removeItem = async (cartItemId: string) => {
    await cartStorage.removeItem(cartItemId);
    setCart(await cartStorage.getCart());
  };

  const updateQuantity = async (
    cartItemId: string,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    cartStorage.updateQuantity(cartItemId, quantity, size, color);
    setCart(await cartStorage.getCart());
  };

  const clearCart = async () => {
    cartStorage.clearCart();
    setCart([]);
  };

  return { cart, addItem, removeItem, updateQuantity, clearCart, isLoaded };
}
