import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Why Us", href: "#why-us" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/80 backdrop-blur-xl shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-site flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="SiteCraft" width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
          <span className="font-heading font-bold text-xl text-gradient">SiteCraft</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-foreground/70 hover:text-primary" : "text-white/90 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <Button
            asChild
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 rounded-lg"
          >
            <a href="#lead-form">Get Started</a>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border animate-fade-in">
          <nav className="container-site flex flex-col gap-4 py-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full rounded-lg"
            >
              <a href="#lead-form" onClick={() => setMobileOpen(false)}>
                Get Started
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
