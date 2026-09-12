import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black text-offwhite">
      <div className="container-page flex flex-col gap-12 py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="text-offwhite">
            <Logo className="h-7" />
            <p className="font-display mt-4 max-w-xs text-2xl italic text-blue">
              Design with a job to do.
            </p>
          </div>

          <div className="flex flex-col gap-2 font-light-brand text-sm uppercase tracking-[0.15em] md:items-end">
            <a href="mailto:hellostudio.m37@gmail.com" className="transition-colors hover:text-blue">
              hellostudio.m37@gmail.com
            </a>
            <a
              href="https://www.instagram.com/studiom.37"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue"
            >
              Instagram
            </a>
            <a
              href="https://www.behance.net/dbdd6540"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue"
            >
              Behance
            </a>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start gap-4 border-t border-white/10 pt-8 text-xs font-light-brand uppercase tracking-[0.15em] text-offwhite/50 md:flex-row md:items-center md:justify-between">
          <span>&copy; {year} Studio M.37. All rights reserved.</span>
          <div className="flex gap-8">
            <Link href="/" className="transition-colors hover:text-blue">Home</Link>
            <Link href="/studio" className="transition-colors hover:text-blue">Studio</Link>
            <Link href="/portfolio" className="transition-colors hover:text-blue">Portfolio</Link>
            <Link href="/enquiry" className="transition-colors hover:text-blue">Enquiry</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
