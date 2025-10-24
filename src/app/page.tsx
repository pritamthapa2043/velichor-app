"use client";

import Link from "next/link";
import { ProductCard } from "./components/product-card";
import { products } from "./lib/products";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] bg-neutral-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/luxury-fashion-hero-banner-elegant-minimalist.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-light tracking-widest mb-4 text-balance">
            WISTERIA COLLECTION
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 text-balance">
            Discover our curated picks of premium fashion
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-white text-neutral-900 font-medium hover:bg-neutral-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-12 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Clothing",
              href: "/shop?category=clothing",
              image: "/luxury-clothing-collection.jpg",
            },
            {
              name: "Shoes",
              href: "/shop?category=shoes",
              image: "/luxury-shoes-collection.png",
            },
            {
              name: "Bags",
              href: "/shop?category=bags",
              image: "/luxury-bags-collection.jpg",
            },
            {
              name: "Accessories",
              href: "/shop?category=accessories",
              image: "/luxury-accessories.png",
            },
          ].map((category) => (
            <Link key={category.name} href={category.href}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden bg-neutral-100 aspect-square mb-4">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 group-hover:text-neutral-700 transition text-center">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-neutral-200">
        <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-12 text-center">
          Featured Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-4">
            Stay Updated
          </h2>
          <p className="text-neutral-300 mb-8">
            Subscribe to our newsletter for exclusive offers and new arrivals
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-neutral-900 font-medium hover:bg-neutral-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
