import { TrendingUp, MessageSquare, Globe } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const cards = [
  {
    icon: TrendingUp,
    title: "Boost Your Business",
    desc: "A professional website helps you stand out from competitors and build credibility with your customers.",
  },
  {
    icon: MessageSquare,
    title: "Get More Customer Inquiries",
    desc: "Easy-to-find contact forms, click-to-call buttons, and WhatsApp integration drive more leads.",
  },
  {
    icon: Globe,
    title: "Grow Your Online Presence",
    desc: "SEO-optimized, mobile-friendly websites ensure customers find you when they search online.",
  },
];

function Card({ icon: Icon, title, desc, delay }: (typeof cards)[0] & { delay: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`bg-card rounded-lg p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        isVisible ? "animate-fade-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="font-heading text-xl font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  const { ref: titleRef, isVisible: titleVis } = useScrollReveal();
  return (
    <section id="why-us" className="py-24 bg-background relative overflow-hidden">
      <div className="container-site">
        <div
          ref={titleRef}
          className={`text-center mb-16 ${titleVis ? "animate-fade-up" : "opacity-0"}`}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Everything You Need to <span className="text-gradient">Succeed Online</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <Card key={c.title} {...c} delay={i * 150} />
          ))}
        </div>
      </div>

      <div
        className="blob-shape w-80 h-80 -top-20 -right-20"
        style={{ background: "hsl(24, 94%, 53%)" }}
      />
    </section>
  );
}
