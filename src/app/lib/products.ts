import type { Product } from "./types";
// import { adminStorage } from "./admin-storage";

// Default products
const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Silk Blend Oversized Blazer",
    category: "clothing",
    price: 2890,
    originalPrice: 3200,
    image: "https://m.media-amazon.com/images/I/41Y9X0BRpAL._SY575_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71jZHYWR6kL._SY695_.jpg",
      "https://m.media-amazon.com/images/I/61oCTi3JJ7L._SY575_.jpg",
    ],
    description:
      "Clara 92.5 Sterling Silver White Gold Plated Heart Solitaire Pendant Chain Necklace | Gift for Women & Girls",
    details: [
      "100% Silk Blend",
      "Dry Clean Only",
      "Made in Italy",
      "Tailored Fit",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Cream", "Navy"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
];

// export const getProductsClient = (): Product[] => {
//   if (typeof window === "undefined") return defaultProducts;
//   try {
//     const stored = localStorage.getItem("admin_products");
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       return Array.isArray(parsed) && parsed.length > 0
//         ? parsed
//         : defaultProducts;
//     }
//   } catch (error) {
//     console.error("[v0] Error parsing admin products:", error);
//   }
//   return defaultProducts;
// };

// export function getProducts(): Product[] {
//   if (typeof window === "undefined") return defaultProducts;
//   const adminProducts = adminStorage.getProducts();
//   return adminProducts.length > 0 ? adminProducts : defaultProducts;
// }

// Keep backward compatibility
export const products = defaultProducts;
