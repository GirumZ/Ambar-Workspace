import { Check } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Hot Desk",
      price: "400 Br",
      period: "/ day",
      description: "Perfect for freelancers and nomads who need a flexible workspace.",
      availability: { status: "green", text: "8 desks available" },
      features: ["Access to open workspace", "High-speed Wi-Fi", "Free coffee and tea", "Lounge area access"],
      buttonText: "Book for Today",
      popular: false,
    },
    {
      name: "Designated Desk",
      price: "8,000 Br",
      period: "/ month",
      description: "A permanent desk you can call your own. 24/7 access.",
      availability: { status: "yellow", text: "Only 2 left" },
      features: ["Your own dedicated desk", "24/7 building access", "Lockable filing cabinet", "5 hours meeting room time"],
      buttonText: "Choose Plan",
      popular: true,
    },
    {
      name: "Private Office",
      price: "18,630 Br",
      period: "/ month",
      description: "A fully furnished office for small teams of up to 4 people.",
      availability: { status: "red", text: "Join waitlist" },
      features: ["Fully furnished for 4 people", "24/7 priority access", "Company logo on door", "15 hours meeting room time"],
      buttonText: "Join Waitlist",
      popular: false,
    },
    {
      name: "Meeting Room",
      price: "400 Br",
      period: "/ hour",
      description: "Professional environment to host your clients and team meetings.",
      availability: { status: "green", text: "Available today" },
      features: ["Seats up to 8 people", "Smart TV & Whiteboard", "Video conferencing setup", "Unlimited refreshments"],
      buttonText: "Check Availability",
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-background" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-secondary mx-auto">
            Choose the perfect plan for how you work. Options for individuals and teams of all sizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-background rounded-3xl p-8 flex flex-col shadow-sm transition-all duration-300 hover:shadow-2xl border ${plan.popular
                ? "border-accent shadow-accent/10 scale-105 z-10"
                : "border-secondary/20 hover:border-accent/40"
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 flex justify-center -mt-4">
                  <span className="bg-primary text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-secondary text-sm min-h-[40px]">{plan.description}</p>
              </div>

              <div className="mb-6 flex items-baseline text-foreground">
                <span className="text-3xl font-extrabold tracking-tight">{plan.price}</span>
                <span className="text-xl text-secondary ml-1">{plan.period}</span>
              </div>

              {/* Availability Indicator */}
              <div className="mb-8 flex items-center bg-accent/10 py-2 px-3 rounded-lg w-fit">
                <div className="flex items-center space-x-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${plan.availability.status === "green" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" :
                    plan.availability.status === "yellow" ? "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" :
                      "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                    }`}></span>
                  <span className="text-sm font-medium text-secondary">{plan.availability.text}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mr-3 mt-0.5" />
                    <span className="text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all ${plan.popular || plan.availability.status === "red"
                  ? "bg-primary hover:bg-foreground text-background shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-accent/10 text-primary hover:bg-accent/20"
                  }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
