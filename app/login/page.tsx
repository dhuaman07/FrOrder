"use client";

import { LoginCard } from "@/src/presentation/modules/auth/components/LoginCard";

export default function LoginPage() {
  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <LoginCard />
      </div>
  );
}