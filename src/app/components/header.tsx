"use client";

import Link from "next/link";
// import { useCart } from "@/hooks/use-cart"
// import { useWishlist } from "@/hooks/use-wishlist"
import { useAuth } from "../hooks/use-auth";
import { useState } from "react";
import { SearchBar } from "./search-bar";

export function Header() {
  //   const { cart } = useCart()
  //   const { wishlist } = useWishlist()
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  //   const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-light tracking-widest text-neutral-900">
              WISTERIA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/shop?category=clothing"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
            >
              Clothing
            </Link>
            <Link
              href="/shop?category=shoes"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
            >
              Shoes
            </Link>
            <Link
              href="/shop?category=bags"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
            >
              Bags
            </Link>
            <Link
              href="/shop?category=accessories"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
            >
              Accessories
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-xs">
            <SearchBar />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* User Menu - Now visible on mobile */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
              >
                Account
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded shadow-lg z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-neutral-200">
                        <p className="text-sm font-medium text-neutral-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-neutral-600">{user.email}</p>
                      </div>
                      {user.isAdmin && (
                        <>
                          <Link
                            href="/admin"
                            className="block px-4 py-3 text-sm text-neutral-900 hover:bg-neutral-50 border-b border-neutral-200 font-medium text-blue-600"
                          >
                            Admin Panel
                          </Link>
                        </>
                      )}
                      <Link
                        href="/account"
                        className="block px-4 py-3 text-sm text-neutral-900 hover:bg-neutral-50 border-b border-neutral-200"
                      >
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        className="block px-4 py-3 text-sm text-neutral-900 hover:bg-neutral-50 border-b border-neutral-200"
                      >
                        My Orders
                      </Link>
                      <Link
                        href="/account/settings"
                        className="block px-4 py-3 text-sm text-neutral-900 hover:bg-neutral-50 border-b border-neutral-200"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="block px-4 py-3 text-sm text-neutral-900 hover:bg-neutral-50 border-b border-neutral-200"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/register"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="block px-4 py-3 text-sm text-neutral-900 hover:bg-neutral-50"
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Link - Hidden on mobile, visible on sm and up */}
            <Link
              href="/wishlist"
              className="relative hidden sm:inline-block text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
            >
              Wishlist
              {/* {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-neutral-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )} */}
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="relative text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
            >
              Cart
              {/* {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-neutral-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )} */}
            </Link>

            {/* Mobile Menu Button */}
            {/* <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              Menu
            </button> */}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {/* <div className="lg:hidden pb-4">
          <SearchBar />
        </div> */}

        {/* Mobile Navigation */}
        {/* {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link
              href="/shop?category=clothing"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              Clothing
            </Link>
            <Link
              href="/shop?category=shoes"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              Shoes
            </Link>
            <Link
              href="/shop?category=bags"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              Bags
            </Link>
            <Link
              href="/shop?category=accessories"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              Accessories
            </Link>
            <Link
              href="/wishlist"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              Wishlist
            </Link>
            {!user && (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
                >
                  Create Account
                </Link>
              </>
            )}
          </nav>
        )} */}
      </div>
    </header>
  );
}
