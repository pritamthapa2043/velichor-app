export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: number;
  isAdmin?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: "clothing" | "shoes" | "bags" | "accessories";
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  details: string[];
  sizes?: string[];
  colors?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}
