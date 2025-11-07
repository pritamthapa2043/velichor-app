import { categoryStorage } from "@/lib/storage";
import { Category } from "@/lib/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CategoriesGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryStorage.getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <p className="text-center text-neutral-500">Loading categories...</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/shop?category=${encodeURIComponent(
            category.name.toLowerCase()
          )}`}
        >
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
  );
}
