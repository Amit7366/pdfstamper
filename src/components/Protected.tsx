"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { hasMinRole, type Role } from "@/lib/roles";

export function Protected({
  children,
  minRole,
}: {
  children: React.ReactNode;
  minRole?: Role;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (minRole && !hasMinRole(user.role, minRole)) {
      router.replace("/dashboard");
    }
  }, [loading, minRole, router, user]);

  if (loading || !user) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
        Checking session...
      </div>
    );
  }

  if (minRole && !hasMinRole(user.role, minRole)) {
    return null;
  }

  return <>{children}</>;
}
