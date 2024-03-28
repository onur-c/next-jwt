"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="p-4">
      <nav className="flex gap-4">
        <Link href="/" className={pathname === "/" ? "underline" : ""}>
          Home Page (Public)
        </Link>
        <Link
          href="/admin/dashboard"
          className={pathname === "/admin/dashboard" ? "underline" : ""}
        >
          Protected Route
        </Link>
        <Link
          href="/sign-in"
          className={pathname === "/sign-in" ? "underline" : ""}
        >
          Sign In
        </Link>
      </nav>
    </header>
  );
};

export default Header;
