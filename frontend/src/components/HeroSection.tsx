import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-primary/65 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Availability Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            <span className="text-sm font-medium text-white">6 desks available today</span>
          </div>

          {/* Main Content */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
            A Better Place to <br className="hidden md:block" />
            <span className="text-accent">Work in Addis</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
            Fast Wi-Fi, comfortable spaces, and flexible plans for freelancers, teams, and creators. Elevate your productivity in our premium environment.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/booking"
              className="inline-flex justify-center items-center bg-accent hover:bg-accent/80 text-foreground px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg transform hover:-translate-y-1"
            >
              Book Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#pricing"
              className="inline-flex justify-center items-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:-translate-y-1"
            >
              View Pricing
            </Link>
          </div>

          {/* Quick Perks */}
          <div className="mt-12 flex items-center space-x-6 text-sm text-white/70">
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
