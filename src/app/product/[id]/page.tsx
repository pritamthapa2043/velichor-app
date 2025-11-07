"use client";

import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { ImageGallery } from "../../../components/imageGallery";
import { ProductOptions } from "../../../components/productOptions";
import { ProductCard } from "../../../components/productCard";
import { productStorage } from "../../../lib/storage";
import type { Product } from "@/lib/types";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await productStorage.getProducts();
      const foundProduct = allProducts.find((p) => p.id.toString() === id);

      if (!foundProduct) {
        setIsLoading(false);
        return;
      }

      setProduct(foundProduct);

      // Get related products (same category, different product)
      const related = allProducts
        .filter(
          (p) =>
            p.category === foundProduct.category && p.id !== foundProduct.id
        )
        .slice(0, 4);
      setRelatedProducts(related);
      setIsLoading(false);
    };

    fetchProducts();
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen bg-white" />;
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-4xl font-light text-neutral-900 mt-2">
                {product.name}
              </h1>
            </div>

            <p className="text-neutral-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            <ProductOptions product={product} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-neutral-200 pt-16">
            <h2 className="text-3xl font-light tracking-wide mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
