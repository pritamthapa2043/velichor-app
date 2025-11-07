"use client";

import { useState } from "react";
import type { Product, CartItem } from "../lib/types";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { toSnakeCaseDeep } from "@/lib/caseConverter";

interface ProductOptionsProps {
  product: Product;
}

export function ProductOptions({ product }: ProductOptionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem } = useCart();
  const {
    isInWishlist,
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
  } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      productId: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    };
    addItem(toSnakeCaseDeep(cartItem));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Price */}
      <div>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-light text-neutral-900">
            ${(product.price / 100).toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-neutral-500 line-through">
              ${(product.originalPrice / 100).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={
                i < Math.floor(product.rating)
                  ? "text-neutral-900"
                  : "text-neutral-300"
              }
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-neutral-600">
          {product.rating} (
          {Array.isArray((product as any).reviews)
            ? ((product as any).reviews as any[]).length
            : Number((product as any).reviews ?? 0)}{" "}
          reviews)
        </span>
      </div>

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-neutral-900 mb-3">
            Color
          </label>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 border-2 rounded transition ${
                  selectedColor === color
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 text-neutral-900 hover:border-neutral-400"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-neutral-900 mb-3">
            Size
          </label>
          <div className="grid grid-cols-4 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 border-2 rounded transition text-sm font-medium ${
                  selectedSize === size
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 text-neutral-900 hover:border-neutral-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-neutral-900 mb-3">
          Quantity
        </label>
        <div className="flex items-center border border-neutral-200 rounded w-fit">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 hover:bg-neutral-100 transition"
          >
            −
          </button>
          <span className="px-6 py-2 border-l border-r border-neutral-200">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 hover:bg-neutral-100 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full py-3 px-4 flex items-center justify-center gap-2 font-medium transition ${
          addedToCart
            ? "bg-green-600 text-white"
            : "bg-neutral-900 text-white hover:bg-neutral-800"
        }`}
      >
        {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
      </button>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`w-full py-3 px-4 flex items-center justify-center gap-2 font-medium border-2 transition ${
          inWishlist
            ? "border-red-500 text-red-500 hover:bg-red-50"
            : "border-neutral-200 text-neutral-900 hover:border-neutral-400"
        }`}
      >
        {inWishlist ? "♥ Remove from Wishlist" : "♡ Add to Wishlist"}
      </button>

      {/* Product Details */}
      <div className="border-t border-neutral-200 pt-6 space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-neutral-900 mb-2">
            Details
          </h4>
          <ul className="space-y-1">
            {product.details?.map((detail, index) => (
              <li key={index} className="text-sm text-neutral-600">
                • {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Stock Status */}
      <div className="text-sm">
        {product.inStock ? (
          <span className="text-green-600 font-medium">In Stock</span>
        ) : (
          <span className="text-red-600 font-medium">Out of Stock</span>
        )}
      </div>
    </div>
  );
}
