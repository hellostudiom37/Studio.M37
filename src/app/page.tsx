import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import TypingHeadline from "@/components/TypingHeadline";
import projects from "@/data/projects.generated.json";

const PHASES = [
  { n: "01", label: "Discovery" },
  { n: "02", label: "Define" },
  { n: "03", label: "Design" },
  { n: "04", label: "Launch" },
];

const FIT_POINTS = [
  "You want a brand that says something, not just one that looks nice.",
  "You're building for the long run, not a quick logo swap.",
  "You'd rather get it right than get it cheap.",
];

export default function Home() {
  return (
    <>
      <section className="flex min-h-screen flex-col justify-center gap-10 bg-offwhite pt-32 pb-20 md:pt-40">
        <div className="container-page flex flex-col gap-10">
          <Reveal>
            <span className="font-light-brand text-sm uppercase tracking-[0.25em] text-black/60">
              Graphic &amp; Brand Design Studio
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-semibold-brand min-h-[2.2em] max-w-4xl text-[11vw] leading-[0.95] text-black md:min-h-[1.1em] md:text-[5.5rem]">
              <TypingHeadline
                segments={[
                  { text: "Design that " },
                  { text: "stands out", className: "font-display italic" },
                  { text: " and " },
                  { text: "sells", className: "font-display italic" },
                  { text: "." },
                ]}
              />
            </h1>
          </Reveal>

          <Reveal delay={0.2} className="max-w-xl">
            <p className="font-light-brand text-lg text-black/70 md:text-xl">
              We design brands that do more than look nice — ones that solve a real problem,
              stand out from the competition, and actually help sell what you&apos;re offering.
              Every piece works together, so your brand says the same thing wherever people
              find it.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-wrap gap-4">
            <Link
              href="/enquiry"
              className="inline-flex items-center rounded-full bg-black px-7 py-3.5 font-light-brand text-sm uppercase tracking-[0.1em] text-offwhite transition-colors hover:bg-white hover:text-black"
            >
              Start a project
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center rounded-full border border-black/20 px-7 py-3.5 font-light-brand text-sm uppercase tracking-[0.1em] text-black transition-colors hover:border-black hover:bg-black hover:text-offwhite"
            >
              View the work
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-black/10 bg-blue py-24 md:py-32">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <h2 className="font-display max-w-xl text-4xl italic text-black md:text-5xl">
                How we work.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/studio#services"
                className="font-light-brand text-sm uppercase tracking-[0.15em] text-black underline underline-offset-4"
              >
                More on our approach &amp; services
              </Link>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PHASES.map((p, i) => (
              <Reveal key={p.n} delay={0.08 * i}>
                <div className="border-t border-black/20 pt-6">
                  <span className="font-display text-3xl italic text-black/40">{p.n}</span>
                  <p className="font-semibold-brand mt-3 text-xl text-black">{p.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-offwhite py-24 md:py-32">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <h2 className="font-display max-w-xl text-4xl italic text-black md:text-5xl">
                Selected work.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/portfolio"
                className="font-light-brand text-sm uppercase tracking-[0.15em] text-black underline underline-offset-4"
              >
                View full portfolio
              </Link>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={0.1 * i}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-black py-24 text-offwhite md:py-32">
        <div className="container-page flex flex-col items-start gap-10">
          <Reveal>
            <h2 className="font-display max-w-2xl text-4xl italic text-blue md:text-5xl">
              You&apos;ll probably enjoy working with us if&hellip;
            </h2>
          </Reveal>

          <ul className="flex flex-col gap-4">
            {FIT_POINTS.map((point, i) => (
              <Reveal key={point} delay={0.08 * i}>
                <li className="font-light-brand flex gap-3 text-lg text-offwhite/80 md:text-xl">
                  <span className="text-blue">—</span>
                  {point}
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3}>
            <Link
              href="/enquiry"
              className="inline-flex items-center rounded-full bg-blue px-8 py-4 font-light-brand text-sm uppercase tracking-[0.1em] text-black transition-colors hover:bg-offwhite"
            >
              Enquire now
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
