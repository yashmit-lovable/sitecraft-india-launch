import { Phone, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div
        className="blob-shape w-72 h-72 -top-10 -right-20"
        style={{ background: "hsl(24, 94%, 53%)" }}
      />
      <div
        className="blob-shape w-56 h-56 bottom-0 -left-16"
        style={{ background: "hsl(217, 72%, 42%)" }}
      />

      <div className="container-site relative z-10">
        <div
          ref={ref}
          className={`max-w-lg mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Contact</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-8 text-foreground">
            Get In <span className="text-gradient">Touch</span>
          </h2>

          <div className="space-y-6">
            <a
              href="tel:9833325983"
              className="flex items-center justify-center gap-3 text-lg text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5 text-accent" />
              9833325983
            </a>

            <a
              href="https://instagram.com/site_craft_2026"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 text-lg text-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5 text-accent" />
              @site_craft_2026
            </a>

            <Button
              asChild
              size="lg"
              className="mt-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold px-8 py-6 rounded-lg shadow-lg"
            >
              <a
                href="https://instagram.com/site_craft_2026"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="mr-2 w-5 h-5" />
                Follow us on Instagram
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
