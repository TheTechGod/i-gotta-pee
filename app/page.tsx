// app/page.tsx
"use client";

/**
 * Public Landing Page
 * - Logo + brand hero
 * - Login / Signup primary actions
 * - Soft CTA to go straight to map
 * - Layout owns footer & overall structure
 */

import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="flex items-center justify-center px-6 py-24 bg-[var(--brand-bg)]">
      <div className="text-center max-w-md">

        {/* LOGO */}
        <img
          src="/img/logo.jpg"
          alt="iGottaPee logo"
          className="w-48 h-auto mx-auto mb-6"
        />

        {/* HEADLINE */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          iGottaPee
        </h1>

        <p className="text-slate-700 mb-8">
          Find a public bathroom fast — no panic, no guessing.
        </p>

        {/* PRIMARY ACTIONS */}
        <div className="flex justify-center gap-4 mb-6">
          <Link
            href="/login"
            className="px-6 py-3 rounded-lg font-semibold text-white
                       bg-[var(--brand-secondary)]
                       hover:opacity-90 transition"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="px-6 py-3 rounded-lg font-semibold
                       border border-slate-300 bg-white text-slate-800
                       hover:bg-slate-50 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* SECONDARY CTA */}
        <Link
          href="/map"
          className="text-sm text-blue-600 hover:underline"
        >
          Just find a bathroom →
        </Link>

      </div>
    </section>
  );
}
