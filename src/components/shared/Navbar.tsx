"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const planCount = 0;
const savedCount = 0;

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-[#24262c] bg-[#0b0c0e]">
      <nav className="mx-auto flex min-h-[64px] w-full max-w-[1400px] items-center justify-between px-4 sm:px-6">

        {/* Top Left */}
        <div>
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              src="/assets/logo.png"
              alt="Fitlog"
              width={22}
              height={22}
              className="h-[20px] w-[20px] object-contain"
            />

            <span className="text-sm font-bold text-white">
              FITLOG
            </span>
          </Link>
        </div>

        {/* Top Middle */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 sm:flex">

          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-[10px] font-medium transition-colors ${
              pathname === "/"
                ? "bg-[#ccff00] text-black"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-[10px] font-medium transition-colors ${
              pathname === "/my-plan"
                ? "bg-[#ccff00] text-black"
                : "text-[#8b8d93] hover:bg-white hover:text-black"
            }`}
          >
            My plan
          </Link>

        </div>

        {/* Top Right */}
        <div className="flex shrink-0 items-center gap-3">

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-[10px] text-[#8b8d93] transition-colors hover:text-white"
          >
            <span>Plan</span>

            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ccff00] px-1 text-[9px] font-bold leading-none text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-[10px] text-[#8b8d93] transition-colors hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-4 min-w-4 items-center justify-center rounded-full border border-[#3b3d43] px-1 text-[9px] leading-none text-[#8b8d93]">
              {savedCount}
            </span>
          </Link>

        </div>

      </nav>
    </header>
  );
};

export default Navbar;