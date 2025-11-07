import { toCamelCaseDeep } from "./caseConverter";
import type { CartItem, Category, Product, WishlistItem } from "./types";

const API_BASE = "/api/";

export const cartStorage = {
  // Fetch all cart items from backend
  getCart: async (): Promise<CartItem[]> => {
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      return toCamelCaseDeep(data);
    } catch (err) {
      console.error("Error fetching Cart: ", err);
      return [];
    }
  },

  // Add an item to cary
  addItem: async (item: CartItem) => {
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error("Failed to add item to cart");
      return await res.json();
    } catch (err) {
      console.error("Error adding item to cart: ", err);
    }
  },

  // Remove a specific cart item by its id
  removeItem: async (cartItemId: string) => {
    try {
      const res = await fetch(`${API_BASE}/cart/${cartItemId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to remove item from cart");
      return await res.json();
    } catch (err) {
      console.error("Failed to remove item from cart: ", err);
    }
  },

  updateQuantity: async (
    cartItemId: string,
    quantity?: number,
    size?: string,
    color?: string
  ) => {
    try {
      const res = await fetch(`${API_BASE}/cart/${cartItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ quantity, size, color }),
      });
      if (!res.ok) throw new Error("Failed to update item in cart");
      return await res.json();
    } catch (err) {
      console.error("Error updating item in cart: ", err);
    }
  },

  // Clear all cart items
  clearCart: async () => {
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to clear cart");
      return await res.json();
    } catch (err) {
      console.error("Error clearing cart: ", err);
    }
  },
};

export const wishlistStorage = {
  // Get wishlist items
  getWishlist: async (): Promise<WishlistItem[]> => {
    try {
      const res = await fetch(`${API_BASE}/wishlist`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch wishlist");
      return await res.json();
    } catch (err) {
      console.error("Error fetching wishlist: ", err);
      return [];
    }
  },

  // Add product to wishlist
  addItem: async (productId: string) => {
    try {
      const res = await fetch(`${API_BASE}/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: productId }),
      });
      if (!res.ok) throw new Error("Failed to add to wishlist");
      return await res.json();
    } catch (err) {
      console.error("Failed to add to wishlist");
    }
  },

  // Remove product from wishlist
  removeItem: async (productId: string) => {
    try {
      const res = await fetch(`${API_BASE}/wishlist/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to remove from wishlist");
      return await res.json();
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  },

  // ✅ Check if product is in wishlist (using getWishlist)
  isInWishlist: async (productId: string): Promise<boolean> => {
    const wishlist = await wishlistStorage.getWishlist();
    return wishlist.some((i) => i.productId === productId);
  },
};

export const productStorage = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: "GET",
      });

      if (!res.ok)
        throw new Error(`Failed to fetch products: ${res.statusText}`);

      const data = await res.json();

      return toCamelCaseDeep(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      return [];
    }
  },
};

export const categoryStorage = {
  getCategories: async (): Promise<Category[]> => {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) throw new Error("Error in fetching categories");

      return await res.json();
    } catch (err) {
      console.error("Error in fetching categories");
      return [];
    }
  },
};
