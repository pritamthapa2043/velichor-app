"use client";

import { CartItem } from "@/components/cartItem";
import { useCart } from "@/hooks/useCart";
import { productStorage } from "@/lib/storage";
import { Product } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, clearCart, isLoaded, removeItem, updateQuantity } = useCart();
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

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const shipping = cartTotal > 0 ? 100 : 0; // 100 rupees shipping
  const tax = Math.round(cartTotal * 0.1); // 10% tax
  const grandTotal = cartTotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-light tracking-wide mb-8">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-600 mb-8">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-neutral-200 rounded">
                {cart.map((item) => (
                  <CartItem
                    key={`${item.productId}-${item.size}-${item.color}`}
                    item={item}
                    removeItem={removeItem}
                    updateQuantity={updateQuantity}
                  />
                ))}
              </div>
              <button
                onClick={() => clearCart()}
                className="mt-4 text-sm text-red-600 hover:text-red-700 font-medium transition"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 border border-neutral-200 rounded p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-neutral-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="text-neutral-900 font-medium">
                      ₹{(cartTotal / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="text-neutral-900 font-medium">
                      ₹{(shipping / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Tax</span>
                    <span className="text-neutral-900 font-medium">
                      ₹{(tax / 100).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-semibold text-neutral-900">
                    Total
                  </span>
                  <span className="text-lg font-semibold text-neutral-900">
                    ₹{(grandTotal / 100).toFixed(2)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-3 px-4 bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition flex items-center justify-center gap-2 mb-3"
                >
                  Proceed to Checkout →
                </Link>

                <Link
                  href="/shop"
                  className="block text-center py-3 px-4 border border-neutral-200 text-neutral-900 font-medium hover:bg-neutral-50 transition"
                >
                  Continue Shopping
                </Link>

                <p className="text-xs text-neutral-600 text-center mt-4">
                  Free shipping on orders over ₹100
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
