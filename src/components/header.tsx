"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { SearchBar } from "./searchBar";
import { usePathname } from "next/navigation";

export function Header() {
  const { user, logout } = useAuth();
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = ["clothing", "shoes", "bags", "accessories"].map((c) => ({
    href: `/shop?category=${c}`,
    label: c[0].toUpperCase() + c.slice(1),
  }));

  const userMenuItems = user
    ? [
        ...(user.isAdmin
          ? [{ href: "/admin", label: "Admin Panel", highlight: true }]
          : []),
        { href: "/account", label: "My Account" },
        { href: "/account/orders", label: "My Orders" },
        { href: "/account/settings", label: "Settings" },
      ]
    : [
        { href: "/auth/login", label: "Sign In" },
        { href: "/auth/register", label: "Create Account" },
      ];

  /** Close dropdowns when route changes */
  useEffect(() => {
    setUserOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  /** Close dropdown when clicking outside */
  useEffect(() => {
    const closeOnClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, []);

  /** Handlers */
  const toggleUserMenu = useCallback(() => setUserOpen((p) => !p), []);
  const toggleMobileMenu = useCallback(() => setMobileOpen((p) => !p), []);

  /** Subcomponents */
  const NavLinks = ({
    links,
  }: {
    links: { href: string; label: string }[];
  }) => (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  const MenuItem = ({
    href,
    label,
    onClick,
    highlight,
  }: {
    href: string;
    label: string;
    onClick?: () => void;
    highlight?: boolean;
  }) => (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-3 text-sm border-b border-neutral-200 hover:bg-neutral-50 ${
        highlight ? "text-blue-600 font-medium" : "text-neutral-900"
      }`}
    >
      {label}
    </Link>
  );

  const UserMenu = () => (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded shadow-lg z-50"
    >
      {user && (
        <div className="px-4 py-3 border-b border-neutral-200">
          <p className="text-sm font-medium text-neutral-900">{user.name}</p>
          <p className="text-xs text-neutral-600">{user.email}</p>
        </div>
      )}

      {userMenuItems.map((item) => (
        <MenuItem
          key={item.href}
          {...item}
          onClick={() => setUserOpen(false)}
        />
      ))}

      {user && (
        <button
          onClick={() => {
            logout();
            setUserOpen(false);
          }}
          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
        >
          Sign Out
        </button>
      )}
    </div>
  );

  const MobileMenu = () => (
    <div className="lg:hidden pb-4 border-t mt-2 pt-4">
      <div className="pb-3">
        <SearchBar />
      </div>
      <nav className="flex flex-col gap-3">
        <NavLinks links={navLinks} />
        <Link
          href="/wishlist"
          className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
        >
          Wishlist
        </Link>

        {!user &&
          userMenuItems.map((item) => (
            <MenuItem
              key={item.href}
              {...item}
              onClick={() => setMobileOpen(false)}
            />
          ))}
      </nav>
    </div>
  );

  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MAIN HEADER */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-light tracking-widest text-neutral-900">
              WISTERIA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLinks links={navLinks} />
          </nav>

          {/* Search */}
          <div className="hidden lg:block flex-1 max-w-xs">
            <SearchBar />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* User */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
              >
                {user ? `Hi, ${user.name?.split(" ")[0]}` : "Account"}
              </button>
              {isUserOpen && <UserMenu />}
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden sm:inline-block text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
            >
              Wishlist
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 transition"
            >
              Cart
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              {isMobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {isMobileOpen && <MobileMenu />}
      </div>
    </header>
  );
}
