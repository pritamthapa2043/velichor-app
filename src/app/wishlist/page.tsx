"use client";

import { ProductCard } from "@/components/productCard";
import { useWishlist } from "@/hooks/useWishlist";
import { productStorage } from "@/lib/storage";
import { Product } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const { wishlist, isLoaded } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setProducts(await productStorage.getProducts());
    };

    fetchProducts();
  }, []);

  if (!isLoaded) {
    return <div className="min-h-screen bg-white" />;
  }

  const wishlistProducts = products.filter((p) =>
    wishlist.some((w) => w.productId === p.id)
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-light tracking-wide mb-2">My Wishlist</h1>
        <p className="text-neutral-600 mb-8">
          {wishlistProducts.length} items saved
        </p>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-600 mb-8">Your wishlist is empty</p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
