"use client";

import type React from "react";

import Link from "next/link";
import { Product } from "../lib/types";
import { useWishlist } from "../hooks/use-wishlist";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, addItem, removeItem } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addItem(product.id);
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4] mb-4">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          <button
            onClick={handleWishlistToggle}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
          >
            <span
              className={`text-lg transition ${
                inWishlist ? "text-red-500" : "text-neutral-400"
              }`}
            >
              {inWishlist ? "♥" : "♡"}
            </span>
          </button>
        </div>
        <h3 className="text-sm font-medium text-neutral-900 group-hover:text-neutral-700 transition">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-semibold text-neutral-900">
            ${(product.price / 100).toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-neutral-500 line-through">
              ${(product.originalPrice / 100).toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-xs text-neutral-600">★ {product.rating}</span>
          <span className="text-xs text-neutral-500">({product.reviews})</span>
        </div>
      </div>
    </Link>
  );
}
