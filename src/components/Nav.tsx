"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Studio" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/enquiry", label: "Enquiry" },
];

export default function Nav({ logo }: { logo: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 bg-offwhite/80 backdrop-blur-md">
      <nav className="container-page flex items-center justify-between py-5">
        <Link href="/" className="relative z-50 text-black" aria-label="Studio M.37 home">
          {logo ?? <span className="font-semibold-brand text-lg tracking-tight">Studio M.37</span>}
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className="font-light-brand text-sm uppercase tracking-[0.15em] text-black"
                >
                  {link.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-black"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <Link
          href="/enquiry"
          className="hidden md:inline-flex items-center rounded-full bg-black px-5 py-2 font-light-brand text-sm uppercase tracking-[0.1em] text-offwhite transition-colors hover:bg-blue hover:text-black"
        >
          Start a project
        </Link>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-6 bg-black"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-6 bg-black"
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
            className="border-t border-black/10 bg-offwhite md:hidden"
          >
            <ul className="container-page flex flex-col gap-6 py-8">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link href={link.href} onClick={close} className="font-display text-3xl italic text-black">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
