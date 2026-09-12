import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/data/projects.generated.json";

export const metadata: Metadata = {
  title: "Portfolio — Studio M.37",
  description: "Selected brand and identity work by Studio M.37.",
};

export default function PortfolioPage() {
  return (
    <section className="container-page pt-36 pb-24 md:pt-44 md:pb-32">
      <Reveal>
        <span className="font-light-brand text-sm uppercase tracking-[0.25em] text-black/60">
          Portfolio
        </span>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="font-display mt-4 max-w-2xl text-5xl italic text-black md:text-6xl">
          Selected work.
        </h1>
      </Reveal>

      <Reveal delay={0.15} className="mt-6 max-w-lg">
        <p className="font-light-brand text-black/70">
          Each project lives on Behance — hover a case to preview it, click through for the full
          breakdown.
        </p>
      </Reveal>

      {projects.length > 0 ? (
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={0.08 * i}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal delay={0.2} className="mt-16 max-w-md font-light-brand text-black/50">
          Projects will appear here as soon as they&apos;re added to{" "}
          <code className="rounded bg-black/5 px-1.5 py-0.5 text-black/70">content/projects</code>.
        </Reveal>
      )}
    </section>
  );
}
