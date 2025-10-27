"use client";

import { useState, useEffect } from "react";
import type { WishlistItem } from "../lib/types";
// import { wishlistStorage } from "../lib/storage";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("[v0] useWishlist hook mounted, loading wishlist");
    // const wishlistData = wishlistStorage.getWishlist();
    // console.log("[v0] Wishlist data loaded:", wishlistData);
    // setWishlist(wishlistData);
    setIsLoaded(true);
  }, []);

  const addItem = (productId: string) => {
    console.log("[v0] useWishlist addItem called with productId:", productId);
    // wishlistStorage.addItem(productId);
    // const updatedWishlist = wishlistStorage.getWishlist();
    // console.log("[v0] Updated wishlist:", updatedWishlist);
    // setWishlist(updatedWishlist);
  };

  const removeItem = (productId: string) => {
    // wishlistStorage.removeItem(productId);
    // setWishlist(wishlistStorage.getWishlist());
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some((i) => i.productId === productId);
  };

  return { wishlist, addItem, removeItem, isInWishlist, isLoaded };
}
