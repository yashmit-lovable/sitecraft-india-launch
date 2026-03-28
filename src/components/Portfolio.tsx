import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExternalLink } from "lucide-react";

const projects = [
  { title: "Tuition Center", category: "Education", placeholder: true },
  { title: "Salon & Spa", category: "Beauty", placeholder: true },
  { title: "Law Firm", category: "Legal", placeholder: true },
];

export default function Portfolio() {
  const { ref: titleRef, isVisible: titleVis } = useScrollReveal();

  return (
    <section id="portfolio" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container-site">
        <div
          ref={titleRef}
          className={`text-center mb-16 ${titleVis ? "animate-fade-up" : "opacity-0"}`}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 text-foreground">
            View Some of <span className="text-gradient">Our Work</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Real websites we've built for local businesses across India.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => {
            const { ref, isVisible } = useScrollReveal();
            return (
              <div
                key={project.title}
                ref={ref}
                className={`group rounded-xl overflow-hidden border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Screenshot area */}
                <div className="aspect-video bg-muted/50 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <ExternalLink className="w-7 h-7 text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Screenshot coming soon
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="font-heading text-lg font-bold mt-1 text-foreground">
                    {project.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
