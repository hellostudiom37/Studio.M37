"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Service = {
  name: string;
  audience: string;
  timeline: string;
  price: string;
  included: string[];
  deliverables: string[];
  files: string[];
};

export default function ServiceCard({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div className="max-w-lg">
          <span className="font-semibold-brand text-xl text-black">{service.name}</span>
          <p className="font-light-brand mt-1.5 text-sm leading-relaxed text-black/60">
            {service.audience}
          </p>
        </div>
        <div className="flex shrink-0 gap-8 font-light-brand text-sm uppercase tracking-[0.1em] text-black/60 sm:text-right">
          <span>{service.timeline}</span>
          <span className="text-black">{service.price}</span>
        </div>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        className="font-light-brand mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-black/50 transition-colors hover:text-black"
        aria-expanded={open}
      >
        {open ? "Hide" : "See what's included"}
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}>
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pt-6 sm:grid-cols-3">
              <ServiceList title="What's included" items={service.included} />
              <ServiceList title="Deliverables" items={service.deliverables} />
              <ServiceList title="Files" items={service.files} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ServiceList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-semibold-brand text-xs uppercase tracking-[0.1em] text-black/40">{title}</p>
      <ul className="font-light-brand mt-3 space-y-1.5 text-sm text-black/70">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
