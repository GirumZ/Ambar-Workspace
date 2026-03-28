import { Wifi, Coffee, ShieldCheck, MapPin } from "lucide-react";

export default function ValueSection() {
  const benefits = [
    {
      title: "High-Speed Internet",
      description: "Enterprise-grade Wi-Fi to keep your workflows perfectly uninterrupted.",
      icon: Wifi,
    },
    {
      title: "Free Coffee & Tea",
      description: "Unlimited freshly brewed coffee and premium tea to fuel your creativity.",
      icon: Coffee,
    },
    {
      title: "Secure & Quiet",
      description: "24/7 security with soundproofed areas designed for deep focus.",
      icon: ShieldCheck,
    },
    {
      title: "Prime Location",
      description: "Located in the heart of Addis Ababa with easy access to transport and dining.",
      icon: MapPin,
    },
  ];

  return (
    <section className="py-24 bg-background" id="facilities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-secondary tracking-wide uppercase">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-4 max-w-2xl text-xl text-secondary mx-auto">
            We've carefully designed our space to provide the perfect balance of comfort, focus, and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-accent/5 rounded-2xl p-8 hover:bg-background transition-all duration-300 shadow-sm hover:shadow-xl border border-transparent hover:border-accent/30 group"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                <benefit.icon className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-secondary leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
