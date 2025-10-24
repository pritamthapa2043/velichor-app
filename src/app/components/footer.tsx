import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-light tracking-widest mb-4">
              WISTERIA
            </h3>
            <p className="text-sm text-neutral-400">
              Luxury fashion for the discerning individual.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link
                  href="/shop?category=clothing"
                  className="hover:text-white transition"
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=shoes"
                  className="hover:text-white transition"
                >
                  Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=bags"
                  className="hover:text-white transition"
                >
                  Bags
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=accessories"
                  className="hover:text-white transition"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; 2025 LUXE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
