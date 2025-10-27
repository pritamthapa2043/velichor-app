"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/use-auth";
import Link from "next/link";
import { useEffect } from "react";

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

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* SIDE BAR */}
            <div className="md:col-span-1">
              <div className="bg-neutral-50 rounded p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-neutral-600">{user?.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <Link
                    href="/account"
                    className="block px-4 py-2 bg-neutral-900 text-white rounded text-sm font-medium"
                  >
                    Account Overview
                  </Link>
                  <Link
                    href="/account/orders"
                    className="block px-4 py-2 text-neutral-900 hover:bg-neutral-100 rounded text-sm font-medium transition"
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/account/settings"
                    className="block px-4 py-2 text-neutral-900 hover:bg-neutral-100 rounded text-sm font-medium transition"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded text-sm font-medium transition flex items-center gap-2"
                  >
                    ← Sign Out
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3 space-y-8">
              {/* Welcome Section */}
              <div className="bg-neutral-50 rounded p-8">
                <h1 className="text-3xl font-light tracking-wide mb-2">
                  Welcome, {user?.name}!
                </h1>
                <p className="text-neutral-600">
                  Manage your account and view your orders
                </p>
              </div>

              {/**Quick Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/cart" className="group">
                  <div className="border border-neutral-200 rounded p-6 hover:border-neutral-400 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-100 rounded flex items-center justify-center group-hover:bg-neutral-200 transition text-lg font-semibold">
                        ◆
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-900">
                          Shopping Cart
                        </h3>
                        <p className="text-sm text-neutral-600">
                          View your cart
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link href="/wishlist" className="group">
                  <div className="border border-neutral-200 rounded p-6 hover:border-neutral-400 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-100 rounded flex items-center justify-center group-hover:bg-neutral-200 transition text-lg font-semibold">
                        ◇
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-900">
                          Wishlist
                        </h3>
                        <p className="text-sm text-neutral-600">
                          Your saved items
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/**Account Info */}
              <div className="border border-neutral-200 rounded p-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                  Account Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Full Name</p>
                    <p className="text-neutral-900 font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">
                      Email Address
                    </p>
                    <p className="text-neutral-900 font-medium">
                      {user?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">
                      Member Since
                    </p>
                    <p className="text-neutral-900 font-medium">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
