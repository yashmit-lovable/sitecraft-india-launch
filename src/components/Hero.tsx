import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-foreground/88" />

      {/* Content */}
      <div className="relative z-10 container-site text-center py-32">
        <h1
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
          style={{ color: "hsl(0 0% 100%)" }}
        >
          Affordable Websites for
          <br />
          Your <span className="text-gradient">Local Business</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-10" style={{ color: "hsl(0 0% 100% / 0.75)" }}>
          Get a professionally designed website starting at just{" "}
          <span className="font-bold" style={{ color: "hsl(24, 94%, 53%)" }}>₹3,500</span>.
          Boost your online presence and attract more customers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 rounded-lg shadow-lg shadow-accent/25"
          >
            <a href="#lead-form">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 font-semibold text-lg px-8 py-6 rounded-lg"
            style={{
              borderColor: "hsl(0 0% 100% / 0.3)",
              color: "hsl(0 0% 100%)",
              backgroundColor: "transparent",
            }}
          >
            <a href="#pricing">View Pricing</a>
          </Button>
        </div>
      </div>

      {/* Decorative blobs */}
      <div
        className="blob-shape w-72 h-72 top-20 -left-20"
        style={{ background: "hsl(217, 72%, 42%)" }}
      />
      <div
        className="blob-shape w-96 h-96 bottom-10 -right-32"
        style={{ background: "hsl(24, 94%, 53%)" }}
      />
    </section>
  );
}
