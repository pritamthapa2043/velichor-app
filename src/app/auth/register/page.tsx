"use client";

import { useAuth } from "../../../hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword || !phone) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    const success = await register(email, password, name, phone);
    if (success) {
      router.push("/account");
    } else {
      setError("Email already registered");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light tracking-wide mb-2">
            Create Account
          </h1>
          <p className="text-neutral-600">Join WISTERIA today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="+91 | Mobile Number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:ring-2"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-200 rounded focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-neutral-600 text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-neutral-900 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
