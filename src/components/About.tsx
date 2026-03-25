import { Instagram } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import logo from "@/assets/logo.png";

export default function About() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="about" className="py-24 bg-secondary/50 relative overflow-hidden">
      <div
        className="blob-shape w-64 h-64 top-10 -left-16"
        style={{ background: "hsl(217, 72%, 42%)" }}
      />
      <div
        className="blob-shape w-48 h-48 bottom-10 -right-10"
        style={{ background: "hsl(24, 94%, 53%)" }}
      />

      <div className="container-site relative z-10">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <img
            src={logo}
            alt="SiteCraft Logo"
            width={80}
            height={80}
            className="w-20 h-20 mx-auto mb-6"
            loading="lazy"
          />
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-6 text-foreground">
            We Help <span className="text-gradient">Local Businesses</span> Grow Online
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            SiteCraft is a web design agency dedicated to helping small and local businesses
            across India establish a professional online presence. We believe every business
            deserves a great website — without breaking the bank. From chai shops to coaching
            centres, we craft websites that convert visitors into customers.
          </p>
          <a
            href="https://instagram.com/site_craft_2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium"
          >
            <Instagram className="w-5 h-5" />
            @site_craft_2026
          </a>
        </div>
      </div>
    </section>
  );
}
