"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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
              <span className="text-white">ambar.</span><span className="text-accent"> Workspace</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="text-secondary hover:text-primary font-medium transition-colors">
              Home
            </Link>
            <Link href="#pricing" className="text-secondary hover:text-primary font-medium transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="text-secondary hover:text-primary font-medium transition-colors">
              Contact
            </Link>
            <Link
              href="#pricing"
              className="bg-primary hover:bg-foreground text-background px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Book Now
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
            <div className="mt-4 px-3">
              <Link
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-primary hover:bg-foreground text-background px-6 py-3 rounded-xl font-medium shadow-md"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
