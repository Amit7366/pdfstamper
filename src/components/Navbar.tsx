"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { hasMinRole, ROLE_LABELS, ROLES } from "@/lib/roles";

export function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  const linkClass = (href: string) =>
    `rounded-md px-3 py-2 text-sm font-medium ${
      pathname === href
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          PDF Stamper
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          {user && (
            <Link href="/dashboard" className={linkClass("/dashboard")}>
              Dashboard
            </Link>
          )}
          {user && hasMinRole(user.role, ROLES.ADMIN) && (
            <Link href="/users" className={linkClass("/users")}>
              Users
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {loading ? (
            <span className="text-sm text-slate-400">Loading...</span>
          ) : user ? (
            <>
              <span className="hidden text-sm text-slate-500 sm:block">
                {user.name} · {ROLE_LABELS[user.role]}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
