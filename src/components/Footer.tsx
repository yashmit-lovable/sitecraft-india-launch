import { Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-foreground py-12">
      <div className="container-site text-center" style={{ color: "hsl(0 0% 100% / 0.8)" }}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src={logo} alt="SiteCraft" width={32} height={32} className="w-8 h-8" loading="lazy" />
          <span className="font-heading font-bold text-lg text-gradient">SiteCraft</span>
        </div>

        <a
          href="https://instagram.com/site_craft_2026"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
          style={{ color: "hsl(0 0% 100% / 0.7)" }}
        >
          <Instagram className="w-4 h-4" />
          @site_craft_2026
        </a>

        <p className="text-sm mb-4" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
          Professional Designs • Mobile Friendly • SEO Optimized
        </p>

        <p className="text-xs" style={{ color: "hsl(0 0% 100% / 0.4)" }}>
          © {new Date().getFullYear()} SiteCraft. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
