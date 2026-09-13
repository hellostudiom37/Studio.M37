"use client";

import { useEffect, useRef, useState } from "react";

// ~2s to type the full hero line (34 chars), per spec.
const TYPE_SPEED = 58;
const DELETE_SPEED = 35;
const PAUSE_FULL = 2000;
const PAUSE_EMPTY = 500;

export type TypingSegment = { text: string; className?: string };

export default function TypingHeadline({ segments }: { segments: TypingSegment[] }) {
  const fullText = segments.map((s) => s.text).join("");
  const [length, setLength] = useState(0);
  const direction = useRef<"typing" | "deleting">("typing");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      setLength((current) => {
        if (direction.current === "typing") {
          if (current < fullText.length) {
            timer = setTimeout(tick, TYPE_SPEED);
            return current + 1;
          }
          direction.current = "deleting";
          timer = setTimeout(tick, PAUSE_FULL);
          return current;
        }

        if (current > 0) {
          timer = setTimeout(tick, DELETE_SPEED);
          return current - 1;
        }
        direction.current = "typing";
        timer = setTimeout(tick, PAUSE_EMPTY);
        return current;
      });
    };

    timer = setTimeout(tick, TYPE_SPEED);
    return () => clearTimeout(timer);
  }, [fullText]);

  const segmentStarts = segments.map((_, i) =>
    segments.slice(0, i).reduce((sum, s) => sum + s.text.length, 0)
  );

  return (
    <span>
      <span aria-hidden="true">
        {segments.map((segment, i) => {
          const remaining = length - segmentStarts[i];
          const shown = segment.text.slice(0, Math.max(0, remaining));
          if (!shown) return null;
          return (
            <span key={i} className={segment.className}>
              {shown}
            </span>
          );
        })}
        <span className="typing-cursor">|</span>
      </span>
      <span className="sr-only">{fullText}</span>
    </span>
  );
}
