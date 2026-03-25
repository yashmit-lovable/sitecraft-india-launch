import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const plans = [
  {
    name: "Starter",
    price: "₹3,500",
    pages: "3–4 Pages",
    popular: false,
    features: [
      "Responsive Design",
      "Contact Form",
      "WhatsApp Integration",
      "Basic SEO Setup",
      "1 Revision Round",
    ],
  },
  {
    name: "Growth",
    price: "₹5,000",
    pages: "5–7 Pages",
    popular: true,
    features: [
      "Everything in Starter",
      "Google Maps Integration",
      "Social Media Links",
      "Image Gallery",
      "Advanced SEO",
      "2 Revision Rounds",
    ],
  },
  {
    name: "Pro",
    price: "₹8,000",
    pages: "7–9 Pages",
    popular: false,
    features: [
      "Everything in Growth",
      "Blog / News Section",
      "Testimonials Section",
      "Performance Optimization",
      "Analytics Integration",
      "3 Revision Rounds",
    ],
  },
];

function PlanCard({
  plan,
  delay,
}: {
  plan: (typeof plans)[0];
  delay: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`relative bg-card rounded-lg border-2 p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        plan.popular
          ? "border-accent shadow-2xl shadow-accent/15 scale-[1.03]"
          : "border-border shadow-lg hover:shadow-xl"
      } ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Most Popular
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="font-heading text-xl font-bold text-foreground">{plan.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{plan.pages}</p>
        <div className="mt-4">
          <span className="font-heading text-4xl font-bold text-gradient">{plan.price}</span>
          <span className="text-muted-foreground text-sm"> / one-time</span>
        </div>
      </div>

      <ul className="flex-1 space-y-3 mb-8">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
            <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <Button
        asChild
        className={`w-full font-semibold rounded-lg py-5 ${
          plan.popular
            ? "bg-accent hover:bg-accent/90 text-accent-foreground"
            : "bg-primary hover:bg-primary/90 text-primary-foreground"
        }`}
      >
        <a href="#lead-form">Get Started</a>
      </Button>
    </div>
  );
}

export default function Pricing() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="pricing" className="py-24 bg-secondary/50 relative overflow-hidden">
      <div className="container-site">
        <div
          ref={ref}
          className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((p, i) => (
            <PlanCard key={p.name} plan={p} delay={i * 150} />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Monthly maintenance available at <span className="font-semibold text-foreground">+₹500/month</span> for updates and support.
        </p>
      </div>

      <div
        className="blob-shape w-64 h-64 bottom-10 -left-16"
        style={{ background: "hsl(217, 72%, 42%)" }}
      />
    </section>
  );
}
