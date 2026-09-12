import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/data/projects.generated.json";

const VALUES = [
  {
    title: "Strategy first",
    body: "Every mark, palette and layout starts with why the business exists — not what looks nice on a moodboard.",
    tone: "blue",
  },
  {
    title: "Designed with intent",
    body: "No decoration without reason. If it doesn't earn its place, it doesn't make the cut.",
    tone: "black",
  },
  {
    title: "Built to launch",
    body: "A brand isn't finished at the final file export. We hand over systems that hold up in the real world.",
    tone: "blue",
  },
] as const;

const PHASES = [
  { n: "01", label: "Discovery" },
  { n: "02", label: "Define" },
  { n: "03", label: "Design" },
  { n: "04", label: "Launch" },
];

export default function Home() {
  return (
    <>
      <section className="container-page flex min-h-screen flex-col justify-center gap-10 pt-32 pb-20 md:pt-40">
        <Reveal>
          <span className="font-light-brand text-sm uppercase tracking-[0.25em] text-black/60">
            Brand &amp; Creative Studio
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="max-w-4xl text-[13vw] leading-[0.95] text-black md:text-[6.5rem]">
            <span className="font-semibold-brand">Brands built </span>
            <span className="font-display italic text-blue">with intent.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2} className="max-w-xl">
          <p className="font-light-brand text-lg text-black/70 md:text-xl">
            Studio M.37 is a minimalist creative studio for founders who want their brand to look
            beautiful and think clearly — identity, design and launch support, built on strategy
            rather than trends.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="flex flex-wrap gap-4">
          <Link
            href="/enquiry"
            className="inline-flex items-center rounded-full bg-black px-7 py-3.5 font-light-brand text-sm uppercase tracking-[0.1em] text-offwhite transition-colors hover:bg-blue hover:text-black"
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
      </section>

      <section className="border-t border-black/10 bg-black py-24 text-offwhite md:py-32">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display max-w-2xl text-4xl italic text-blue md:text-5xl">
              What we stand for.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.1 * i}>
                <div
                  className={`flex h-full flex-col justify-between gap-8 rounded-2xl p-8 ${
                    v.tone === "blue" ? "bg-blue text-black" : "bg-offwhite/5 text-offwhite"
                  }`}
                >
                  <span className="font-semibold-brand text-2xl">{v.title}</span>
                  <p className="font-light-brand text-sm leading-relaxed opacity-80">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 py-24 md:py-32">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <h2 className="font-display max-w-xl text-4xl italic text-black md:text-5xl">
                How we work.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/studio"
                className="font-light-brand text-sm uppercase tracking-[0.15em] text-black underline underline-offset-4"
              >
                More on our approach
              </Link>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PHASES.map((p, i) => (
              <Reveal key={p.n} delay={0.08 * i}>
                <div className="border-t border-black/20 pt-6">
                  <span className="font-display text-3xl italic text-blue">{p.n}</span>
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

      <section className="border-t border-black/10 bg-blue py-24 md:py-32">
        <div className="container-page flex flex-col items-start gap-8">
          <Reveal>
            <h2 className="font-semibold-brand max-w-2xl text-4xl text-black md:text-6xl">
              Have a project in mind?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/enquiry"
              className="inline-flex items-center rounded-full bg-black px-8 py-4 font-light-brand text-sm uppercase tracking-[0.1em] text-offwhite transition-colors hover:bg-offwhite hover:text-black"
            >
              Tell us about it
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
