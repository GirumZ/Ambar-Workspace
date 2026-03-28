"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CircleUser, UserPlus, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-secondary/20"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-2xl tracking-tighter text-foreground">
              <span className="text-accent">ambar. Workspace</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="text-accent hover:text-primary font-medium transition-colors">
              Home
            </Link>
            <Link href="#pricing" className="text-accent hover:text-primary font-medium transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="text-accent hover:text-primary font-medium transition-colors">
              Contact
            </Link>
            <Link
              href="/signin"
              className={`flex item-center gap-2 font-medium transition-colors ${isScrolled
                ? "text-foreground hover:text-accent"
                : "text-background hover:text-accent/80"
                }`}
            >
              <CircleUser size={20} strokeWidth={2} />
              <span>Log In</span>
            </Link>

            <Link
              href="/signup"
              className={`flex item-center gap-2 font-medium transition-colors ${isScrolled
                ? "text-foreground hover:text-accent"
                : "text-background hover:text-accent/80"
                }`}
            >
              <UserPlus size={20} strokeWidth={2} />
              <span>Sign Up</span>
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-secondary hover:text-primary focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-secondary/20">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            <Link href="#home" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-accent/10">
              Home
            </Link>
            <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-accent/10">
              Pricing
            </Link>
            <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-accent/10">
              Contact
            </Link>
            <div className="mt-4 px-3 flex flex-col gap-3">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center border border-secondary/30 text-foreground hover:bg-accent/10 px-6 py-3 rounded-xl font-medium transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-primary hover:bg-foreground text-background px-6 py-3 rounded-xl font-medium shadow-md"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
