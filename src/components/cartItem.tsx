import { useCart } from "@/hooks/useCart";
import { productStorage } from "@/lib/storage";
import { CartItem as CartItemType, Product } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartItemProps {
  item: CartItemType;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
}

export function CartItem({ item, removeItem, updateQuantity }: CartItemProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [localQuantity, setLocalQuantity] = useState(1);

  // Debounce wait 500ms after the last change before syncing with backend
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localQuantity !== item.quantity) {
        updateQuantity(String(item.id), localQuantity);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [localQuantity]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await productStorage.getProducts();
      const found = products.find((p) => p.id === item.productId);
      setProduct(found || null);
    };

    getProducts();
  }, [item.productId]);

  if (!product) return null;

  const handleIncrement = () => setLocalQuantity((q) => q + 1);
  const handleDecrement = () => setLocalQuantity((q) => Math.max(1, q - 1));

  const itemTotal = product.price * localQuantity;

  return (
    <div className="flex gap-4 py-6 border-b border-neutral-200">
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="flex-shrink-0">
        <img
          src={
            Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : "/placeholder.svg"
          }
          alt={product.name}
          className="w-24 h-32 object-cover rounded hover:opacity-80 transition"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/product/${product.id}`}
            className="hover:text-neutral-600 transition"
          >
            <h3 className="text-sm font-medium text-neutral-900">
              {product.name}
            </h3>
          </Link>
          <div className="mt-2 space-y-1 text-xs text-neutral-600">
            {item.color && <p>Color: {item.color}</p>}
            {item.size && <p>Size: {item.size}</p>}
          </div>
        </div>

        {/* Quantity and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-neutral-200 rounded w-fit">
            <button
              onClick={handleDecrement}
              className="px-3 py-1 hover:bg-neutral-100 transition text-sm"
            >
              −
            </button>
            <span className="px-4 py-1 border-l border-r border-neutral-200 text-sm">
              {localQuantity}
            </span>
            <button
              onClick={handleIncrement}
              className="px-3 py-1 hover:bg-neutral-100 transition text-sm"
            >
              +
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-neutral-900">
              ₹{(itemTotal / 100).toFixed(2)}
            </p>
            <p className="text-xs text-neutral-600">
              ₹{(product.price / 100).toFixed(2)} each
            </p>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item.id as string)}
        className="flex-shrink-0 p-2 hover:bg-red-50 rounded transition text-red-600 font-semibold"
      >
        ✕
      </button>
    </div>
  );
}
