"use client";

import { useState, useEffect } from "react";
import type { WishlistItem } from "../lib/types";
import { wishlistStorage } from "../lib/storage";
import { toCamelCaseDeep } from "@/lib/caseConverter";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchWishlist = async () => {
    const wishlistData = await wishlistStorage.getWishlist();
    setWishlist(toCamelCaseDeep(wishlistData)); // ✅ normalize here
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addItem = async (productId: string) => {
    await wishlistStorage.addItem(productId);
    await fetchWishlist(); // ✅ refetch + normalize
  };

  const removeItem = async (productId: string) => {
    await wishlistStorage.removeItem(productId);
    await fetchWishlist(); // ✅ refetch + normalize
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some((i) => i.productId === productId);
  };

  return { wishlist, addItem, removeItem, isInWishlist, isLoaded };
}
