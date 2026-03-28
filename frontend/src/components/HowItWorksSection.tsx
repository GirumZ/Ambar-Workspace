import { MousePointerClick, CreditCard, Sparkles } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      id: "01",
      title: "Choose your space",
      description: "Browse our flexible plans and select the workspace that fits your needs perfectly.",
      icon: MousePointerClick,
    },
    {
      id: "02",
      title: "Book and send payment",
      description: "Secure your spot instantly through our seamless and secure online booking system.",
      icon: CreditCard,
    },
    {
      id: "03",
      title: "Get confirmation",
      description: "Receive your access details immediately and get ready to do your best work.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-secondary tracking-wide uppercase">Easy Process</h2>
          <p className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl">How it works</p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-accent/30 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 bg-background rounded-full border-2 border-accent/30 shadow-sm flex flex-col items-center justify-center group-hover:border-accent transition-all duration-300 z-10">
                    <step.icon className="h-8 w-8 text-primary mb-1" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-sm font-bold text-primary z-20 shadow-sm">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-secondary max-w-sm mx-auto leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
