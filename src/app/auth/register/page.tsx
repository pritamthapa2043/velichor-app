"use client";

import { useAuth } from "../../../hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoadinig, setIsLoadinig] = useState(false);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4"></div>
  );
}
