"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import { InfoFieldProps, NavLinkProps, QuickLinkCardProps } from "@/lib/types";

const QuickLinkCard = ({
  href,
  icon,
  title,
  description,
}: QuickLinkCardProps) => (
  <Link href={href} className="group">
    <div className="border border-neutral-200 rounded p-6 hover:border-neutral-400 transition">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-neutral-100 rounded flex items-center justify-center group-hover:bg-neutral-200 transition text-lg font-semibold">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-neutral-900">{title}</h3>
          <p className="text-sm text-neutral-600">{description}</p>
        </div>
      </div>
    </div>
  </Link>
);

const InfoField = ({ label, value }: InfoFieldProps) => (
  <div>
    <p className="text-sm text-neutral-600 mb-1">{label}</p>
    <p className="text-neutral-900 font-medium">{value}</p>
  </div>
);

const NavLink = ({ href, active = false, children }: NavLinkProps) => (
  <Link
    href={href}
    className={`block px-4 py-2 rounded text-sm font-medium transition ${
      active
        ? "bg-neutral-900 text-white"
        : "text-neutral-900 hover:bg-neutral-100"
    }`}
  >
    {children}
  </Link>
);

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/auth/login");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return <div className="min-h-screen bg-white" />;
  }

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-neutral-50 rounded p-6">
              {/* User Profile */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-neutral-600">{user.email}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <NavLink href="/account" active>
                  Account Overview
                </NavLink>
                <NavLink href="/account/orders">My Orders</NavLink>
                <NavLink href="/account/settings">Settings</NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded text-sm font-medium transition flex items-center gap-2"
                >
                  ← Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3 space-y-8">
            {/* Welcome Section */}
            <section className="bg-neutral-50 rounded p-8">
              <h1 className="text-3xl font-light tracking-wide mb-2">
                Welcome, {user.name}!
              </h1>
              <p className="text-neutral-600">
                Manage your account and view your orders
              </p>
            </section>

            {/* Quick Links */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QuickLinkCard
                href="/cart"
                icon="◆"
                title="Shopping Cart"
                description="View your cart"
              />
              <QuickLinkCard
                href="/wishlist"
                icon="◇"
                title="Wishlist"
                description="Your saved items"
              />
            </section>

            {/* Account Information */}
            <section className="border border-neutral-200 rounded p-8">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                Account Information
              </h2>
              <div className="space-y-4">
                <InfoField label="Full Name" value={user.name} />
                <InfoField label="Email Address" value={user.email} />
                <InfoField
                  label="Member Since"
                  value={new Date(user.createdAt).toLocaleDateString()}
                />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
