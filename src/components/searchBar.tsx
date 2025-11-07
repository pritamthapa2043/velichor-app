"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { productStorage } from "../lib/storage";
import { Product } from "@/lib/types";

export function SearchBar() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await productStorage.getProducts();
        setProducts(productData);
      } catch (err) {
        console.error("Error in fetching products: ", err);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(value.toLowerCase()) ||
          p.description.toLowerCase().includes(value.toLowerCase()) ||
          p.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelectProduct = (productId: string) => {
    router.push(`/product/${productId}`);
    setQuery("");
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-neutral-200 rounded focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 rounded transition"
        >
          ⌕
        </button>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="divide-y divide-neutral-200">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="w-full text-left px-4 py-3 hover:bg-neutral-50 transition flex items-center gap-3"
                >
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : "/placeholder.svg"
                    }
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-neutral-600">
                      ${(product.price / 100).toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-sm text-neutral-600">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
