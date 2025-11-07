import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-light text-neutral-900 mb-4">
          Product Not Found
        </h1>
        <p className="text-neutral-600 mb-8">
          The product you're looking for doesn't exist.
        </p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3 bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
