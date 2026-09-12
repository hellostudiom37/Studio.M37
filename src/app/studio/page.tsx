import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FounderPhoto from "@/components/FounderPhoto";

export const metadata: Metadata = {
  title: "Studio — Studio M.37",
  description: "The people, philosophy and process behind Studio M.37.",
};

const PHASES = [
  {
    n: "01",
    label: "Discovery",
    body: "We start by understanding the business, not the brief — audience, competitors, positioning, and what actually needs to be true for this brand to work.",
  },
  {
    n: "02",
    label: "Define",
    body: "Findings become creative direction. Every decision from here is one we can explain, not one we picked because it looked nice.",
  },
  {
    n: "03",
    label: "Design",
    body: "Visual development happens in rounds, refined with you rather than at you — logo, marks, palette, type and system, built to hold together.",
  },
  {
    n: "04",
    label: "Launch",
    body: "Files, guidelines and mockups handed over in full, plus support making sure the brand lands the way it was designed to.",
  },
];

const SERVICES = [
  { name: "Logo Design", price: "500 EUR", timeline: "7–15 days" },
  { name: "Mini Brand", price: "700 EUR", timeline: "15 days" },
  { name: "Brand Identity", price: "900 EUR", timeline: "15–20 days" },
  { name: "Brand Identity Maximum", price: "1400 EUR", timeline: "25–30 days" },
];

export default function StudioPage() {
  return (
    <>
      <section className="container-page grid gap-12 pt-36 pb-24 md:grid-cols-2 md:gap-16 md:pt-44 md:pb-32">
        <Reveal>
          <FounderPhoto />
        </Reveal>

        <div className="flex flex-col justify-center gap-6">
          <Reveal>
            <span className="font-light-brand text-sm uppercase tracking-[0.25em] text-black/60">
              Studio
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display text-4xl italic text-black md:text-5xl">
              About Studio M.37.
            </h1>
          </Reveal>

          <Reveal delay={0.15} className="space-y-4">
            <p className="font-light-brand text-black/70">
              Studio M.37 is a minimalist creative studio building brand identities for founders
              who need more than a nice-looking logo. We work at the intersection of strategy and
              design — figuring out what a business actually stands for, then translating that
              into something visual, consistent, and built to last past launch day.
            </p>
            <p className="font-light-brand text-black/70">
              We create brands to look beautiful, but backed with strategy — every palette,
              typeface and mark exists because it earns its place, not because it was trending.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <blockquote className="font-display border-l-2 border-blue pl-6 text-2xl italic text-black">
              &ldquo;Good design explains itself.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-black/10 bg-black py-24 text-offwhite md:py-32">
        <div className="container-page">
          <Reveal>
            <span className="font-light-brand text-sm uppercase tracking-[0.25em] text-blue">
              Our Approach
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-4 max-w-2xl text-4xl italic md:text-5xl">
              How a project moves.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {PHASES.map((phase, i) => (
              <Reveal key={phase.n} delay={0.08 * i}>
                <div className="flex gap-6 border-t border-offwhite/15 pt-6">
                  <span className="font-display text-3xl italic text-blue">{phase.n}</span>
                  <div>
                    <p className="font-semibold-brand text-xl">{phase.label}</p>
                    <p className="font-light-brand mt-2 text-sm leading-relaxed text-offwhite/70">
                      {phase.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <span className="font-light-brand text-sm uppercase tracking-[0.25em] text-black/60">
              Services
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mt-4 max-w-2xl text-4xl italic text-black md:text-5xl">
              Ways to work together.
            </h2>
          </Reveal>

          <div className="mt-16 divide-y divide-black/10 border-t border-b border-black/10">
            {SERVICES.map((service, i) => (
              <Reveal key={service.name} delay={0.05 * i}>
                <div className="flex flex-col justify-between gap-2 py-6 sm:flex-row sm:items-center">
                  <span className="font-semibold-brand text-xl text-black">{service.name}</span>
                  <div className="flex gap-8 font-light-brand text-sm uppercase tracking-[0.1em] text-black/60">
                    <span>{service.timeline}</span>
                    <span className="text-black">{service.price}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
