"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export type Project = {
  slug: string;
  name: string;
  link: string;
  images: string[];
};

export default function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const preview = project.images[0];

  return (
    <a
      href={project.link || undefined}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-black text-offwhite"
    >
      {preview && (
        <motion.img
          src={preview}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={hovered ? { scale: 1, opacity: 1 } : { scale: 1.08, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="relative flex h-full flex-col justify-end p-6">
        <motion.span
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          className="font-semibold-brand text-2xl"
        >
          {project.name}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          className="font-light-brand mt-1 text-xs uppercase tracking-[0.15em] text-blue"
        >
          View on Behance ↗
        </motion.span>
      </div>
    </a>
  );
}
