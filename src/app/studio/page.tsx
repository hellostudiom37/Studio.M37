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
    body: "I start by understanding the business, not the brief — audience, competitors, positioning, and what actually needs to be true for this brand to work.",
  },
  {
    n: "02",
    label: "Define",
    body: "Findings become creative direction. Every decision from here is one I can explain, not one made just because it looked nice.",
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

const FILES = [
  "Print (AI, PDF)",
  "Web (PNG, JPEG, SVG)",
  "Brand colours + black & white variations",
];

const SERVICES: Service[] = [
  {
    name: "Mini Brand",
    audience:
      "For founders who are just starting out and need one strong, complete base to launch with.",
    timeline: "10–15 work days",
    price: "590 EUR",
    included: [
      "Niche, audience & competitor analysis",
      "Creative direction, moodboard",
      "2 logo concepts to choose from",
      "Primary logo",
      "Secondary logo",
      "2 brand marks",
      "1 brand pattern",
      "Brand colour palette + typography suite",
      "2 rounds of revisions",
    ],
    deliverables: [
      "Mini brand book (usage guidelines)",
      "Logo visualisation / mockups",
      "Brand presentation",
    ],
    files: FILES,
  },
  {
    name: "Brand Identity",
    audience:
      "For growing businesses that need their brand to work everywhere, from Instagram to print.",
    timeline: "15–20 work days",
    price: "850 EUR",
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
    deliverables: [
      "Brand book (usage guidelines)",
      "Logo visualisation / mockups",
      "Brand identity presentation",
    ],
    files: FILES,
  },
  {
    name: "Brand Identity Maximum",
    audience:
      "For businesses ready to invest in one complete brand system, built to grow.",
    timeline: "25–30 work days",
    price: "1300 EUR",
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
    deliverables: [
      "Brand book (usage guidelines)",
      "Logo visualisation / mockups",
      "Brand identity presentation",
    ],
    files: FILES,
  },
];

const GOOD_TO_KNOW = [
  "50% to book your spot, 50% before the final files",
  "The timeline starts once I receive your filled-in brief",
  "These are launch prices for my first clients and may change in 2027",
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
              Meet the Founder.
            </h1>
          </Reveal>

          <Reveal delay={0.15} className="space-y-4">
            <p className="font-light-brand text-black/70">
              My name is Sofia, and I’m the founder and designer behind Studio M.37.
            </p>
            <p className="font-light-brand text-black/70">
              After graduating with a degree in Graphic Design and working with clients across
              Latvia, Cyprus, and the UAE, I decided to establish my own creative studio.
            </p>
            <p className="font-light-brand text-black/70">
              Studio M.37 is a graphic and brand design studio for founders who need more than a
              nice-looking logo. I create thoughtful, memorable identities that tell a story, set
              brands apart, and give them a clear visual voice.
            </p>
            <p className="font-light-brand text-black/70">
              I believe great design starts with deep understanding — the business, the audience,
              and the problem to solve. Every decision should have a purpose. Design should do
              more than look good; it should communicate clearly, solve business problems, and
              help your brand sell.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <blockquote className="font-display border-l-2 border-blue pl-6 text-2xl italic text-black">
              &ldquo;Great design has a reason.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-black/10 bg-black py-24 text-offwhite md:py-32">
        <div className="container-page">
          <Reveal>
            <span className="font-light-brand text-sm uppercase tracking-[0.25em] text-blue">
              The Approach
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
          <Reveal delay={0.15}>
            <p className="font-light-brand mt-4 text-black/60">
              Studio launch prices for my first clients.
            </p>
          </Reveal>

          <div className="mt-16 divide-y divide-black/10 border-t border-b border-black/10">
            {SERVICES.map((service, i) => (
              <Reveal key={service.name} delay={0.05 * i}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 max-w-lg">
              <p className="font-semibold-brand text-xs uppercase tracking-[0.1em] text-black/40">
                Good to know
              </p>
              <ul className="font-light-brand mt-3 space-y-1.5 text-sm text-black/70">
                {GOOD_TO_KNOW.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
