import Link from "next/link";
import { Send } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-primary z-0"></div>

      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-black/10 blur-3xl z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl font-extrabold text-background sm:text-4xl md:text-5xl mb-6">
          Ready to start working better?
        </h2>
        <p className="text-xl text-accent/80 max-w-2xl mx-auto mb-10">
          Join a community of professionals in Addis Ababa's most premium workspace. Book your spot today and elevate your work experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="#pricing"
            className="w-full sm:w-auto inline-flex justify-center items-center bg-accent text-foreground hover:bg-accent/80 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:-translate-y-1"
          >
            Book Now
          </Link>
          <a
            href="#"
            className="w-full sm:w-auto inline-flex justify-center items-center bg-primary/60 hover:bg-primary/80 text-background border border-accent/30 hover:border-accent/60 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:-translate-y-1"
          >
            <Send className="mr-2 h-5 w-5" />
            Telegram Channel
          </a>
        </div>
      </div>
    </section>
  );
}
