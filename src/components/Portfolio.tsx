import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExternalLink } from "lucide-react";
import tuitionImg from "@/assets/portfolio-tuition.png";
import salonImg from "@/assets/portfolio-salon.png";
import lawyerImg from "@/assets/portfolio-lawyer.png";

const projects = [
  {
    title: "Vikalp Academy",
    category: "Education",
    image: tuitionImg,
    url: "https://preview--vikalp-bright-future.lovable.app/",
  },
  {
    title: "11:11 The Salon",
    category: "Beauty",
    image: salonImg,
    url: "https://id-preview--79faed39-9be7-4965-a67b-f1f254b2f9e8.lovable.app/",
  },
  {
    title: "Advocate Rashmi Vyas",
    category: "Legal",
    image: lawyerImg,
    url: "https://id-preview--e457552f-9e12-4977-bf06-0a1ea2674597.lovable.app/",
  },
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
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                ref={ref}
                className={`group rounded-xl overflow-hidden border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Screenshot */}
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={`${project.title} website screenshot`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
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
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
