"use client";

import { ImageGalleryProps } from "../lib/types";
import { useState } from "react";

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-neutral-100 aspect-[3/4] overflow-hidden group">
        <img
          src={images[selectedIndex] || "/placeholder.svg"}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition opacity-0 group-hover:opacity-100"
            >
              <span className="text-neutral-900 font-bold">‹</span>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition opacity-0 group-hover:opacity-100"
            >
              <span className="text-neutral-900 font-bold">›</span>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-20 h-20 rounded overflow-hidden border-2 transition ${
                index === selectedIndex
                  ? "border-neutral-900"
                  : "border-neutral-200 hover:border-neutral-400"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
