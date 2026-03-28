"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      {/* Background decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block font-bold text-3xl tracking-tighter text-foreground">
            Ambar<span className="text-accent">Workspace</span>
          </Link>
          <p className="mt-2 text-secondary text-sm">Welcome back — log in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-background border border-secondary/20 rounded-3xl shadow-xl p-8">
          <h1 className="text-2xl font-extrabold text-foreground mb-6">Log In</h1>

          <form className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-secondary/30 bg-accent/5 text-foreground placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-accent hover:text-primary font-medium transition-colors"
                >
                  Forgot my password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-secondary/30 bg-accent/5 text-foreground placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-foreground text-background font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-2"
            >
              <LogIn className="h-4 w-4" />
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-secondary/20"></div>
            <span className="text-xs text-secondary">Don't have an account?</span>
            <div className="flex-1 h-px bg-secondary/20"></div>
          </div>

          <Link
            href="/signup"
            className="w-full flex items-center justify-center bg-accent/10 hover:bg-accent/20 text-primary font-semibold py-3 rounded-xl transition-all border border-accent/20 hover:border-accent/40"
          >
            Create an account
          </Link>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6 text-sm text-secondary">
          <Link href="/" className="hover:text-primary transition-colors">← Back to homepage</Link>
        </p>
      </div>
    </main>
  );
}
