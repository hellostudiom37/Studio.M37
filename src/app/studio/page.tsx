import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FounderPhoto from "@/components/FounderPhoto";
import ServiceCard, { type Service } from "@/components/ServiceCard";

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

const SERVICES: Service[] = [
  {
    name: "Logo Design",
    audience:
      "Just starting out and need one strong, versatile mark to launch with? This is the low-lift way in.",
    timeline: "7–15 days",
    price: "500 EUR",
    included: [
      "Niche, audience & competitor analysis",
      "Creative direction, moodboard",
      "2 logo concepts to choose from",
      "Primary logo",
      "Secondary logo",
      "Brand mark",
      "Brand colour palette + typography suite",
      "2 rounds of revisions",
    ],
    deliverables: ["Logo book (usage guidelines)", "Logo visualisation / mockups"],
    files: [
      "Print (AI, EPS, PDF)",
      "Web (PNG, JPEG, SVG)",
      "Brand colours + black & white variations",
      "Presentation with logo visualisation",
    ],
  },
  {
    name: "Mini Brand",
    audience:
      "Ready to look consistent across a few more touchpoints, without committing to a full system yet.",
    timeline: "15 days",
    price: "700 EUR",
    included: [
      "Niche, audience & competitor analysis",
      "Creative direction, moodboard",
      "2 logo concepts to choose from",
      "Primary logo",
      "Secondary logo",
      "3 brand marks",
      "1 brand pattern",
      "Brand colour palette + typography suite",
      "2 rounds of revisions",
    ],
    deliverables: ["Brand book (usage guidelines)", "Logo visualisation / mockups"],
    files: [
      "Print (AI, EPS, PDF)",
      "Web (PNG, JPEG, SVG)",
      "Brand colours + black & white variations",
      "Presentation with logo visualisation",
    ],
  },
  {
    name: "Brand Identity",
    audience:
      "Growing, and need a fuller toolkit — social, print, the works — to match where the business is headed.",
    timeline: "15–20 days",
    price: "900 EUR",
    included: [
      "Niche, audience & competitor analysis",
      "Creative direction, moodboard",
      "2 logo concepts to choose from",
      "Primary logo + 2 secondary logos",
      "3 brand marks",
      "Brand colour palette + typography suite",
      "Brand visual elements (icon suite)",
      "1 brand pattern",
      "2 print material layouts (business card, label, etc.)",
      "Social media avatar + 5 highlight covers",
      "2 rounds of revisions",
    ],
    deliverables: ["Brand book (usage guidelines)", "Logo visualisation / mockups"],
    files: [
      "Print (AI, EPS, PDF)",
      "Web (PNG, JPEG, SVG)",
      "Brand colours + black & white variations",
      "Brand identity presentation",
    ],
  },
  {
    name: "Brand Identity Maximum",
    audience:
      "Established, and investing in one complete, built-to-scale brand system for the long haul.",
    timeline: "25–30 days",
    price: "1400 EUR",
    included: [
      "Niche, audience & competitor analysis",
      "Creative direction, moodboard",
      "2 logo concepts to choose from",
      "Primary logo + 2 secondary logos",
      "5 brand marks",
      "Brand colour palette + typography suite",
      "Brand visual elements (icon suite)",
      "2 brand patterns",
      "5 print material layouts (business card, label, etc.)",
      "Social media templates (delivered in Figma)",
      "Social media avatar + 5 highlight covers",
      "3 rounds of revisions",
    ],
    deliverables: ["Brand book (usage guidelines)", "Logo visualisation / mockups"],
    files: [
      "Print (AI, EPS, PDF)",
      "Web (PNG, JPEG, SVG)",
      "Brand colours + black & white variations",
      "Brand identity presentation",
    ],
  },
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
              Studio M.37 is a graphic and brand design studio for founders who need more than a
              nice-looking logo. We design brands that solve a real problem, set you apart from
              the competition, and help sell what you&apos;re actually offering.
            </p>
            <p className="font-light-brand text-black/70">
              That means every palette, typeface and mark has a job to do — working together so
              your brand says the same thing clearly, wherever people come across it.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <blockquote className="font-display border-l-2 border-blue pl-6 text-2xl italic text-black">
              &ldquo;Clear enough to understand, sharp enough to sell.&rdquo;
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

      <section id="services" className="scroll-mt-24 border-t border-black/10 py-24 md:py-32">
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
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
