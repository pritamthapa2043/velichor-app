import { ReactNode } from "react";

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
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  details: string[];
  sizes?: string[];
  colors?: string[];
  rating: number;
  /** DB / API may return a count (number) or a list of review objects */
  reviews: unknown;
  inStock: boolean;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}

export interface QuickLinkCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export interface InfoFieldProps {
  label: string;
  value: string | React.ReactNode;
}

export interface NavLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}

export interface CartItem {
  id?: string;
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  product?: Product;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  image: string;
}

export interface ImageGalleryProps {
  images: string[];
  productName: string;
}
