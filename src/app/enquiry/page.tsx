import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Enquiry — Studio M.37",
  description: "Tell Studio M.37 about your project.",
};

const FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeCZDCDTNAu2JShGlDjgtk_3Ql5jf5V5mpY5vvWGe5CFtJ1JA/viewform?embedded=true";

export default function EnquiryPage() {
  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="container-page">
        <Reveal>
          <span className="font-light-brand text-sm uppercase tracking-[0.25em] text-black/60">
            Enquiry
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-display mt-4 max-w-2xl text-5xl italic text-black md:text-6xl">
            Let&apos;s start something.
          </h1>
        </Reveal>

        <Reveal delay={0.15} className="mt-6 max-w-lg">
          <p className="font-light-brand text-black/70">
            Tell us a little about your project below. We reply to every enquiry within 2–3
            working days — if it&apos;s a fit, we&apos;ll set up a short discovery call.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="container-page mt-14">
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_60px_-30px_rgba(16,16,16,0.3)]">
          <iframe
            src={FORM_EMBED_URL}
            title="Studio M.37 enquiry form"
            className="block h-[2200px] w-full"
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>
      </Reveal>
    </section>
  );
}
