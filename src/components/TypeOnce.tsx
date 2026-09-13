"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Types `text` out once, start to finish, in exactly `durationMs`.
 *
 * Uses requestAnimationFrame driven by elapsed wall-clock time (not a
 * per-character setTimeout chain), so the total duration is exact and
 * independent of string length — no retuning a per-char delay if the
 * copy changes later.
 */
export default function TypeOnce({
  text,
  durationMs = 2000,
}: {
  text: string;
  durationMs?: number;
}) {
  const [count, setCount] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let frame: number;

    const tick = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      setCount(Math.round(progress * text.length));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, durationMs]);

  const shown = text.slice(0, count);
  const done = count >= text.length;

  return (
    <span>
      <span aria-hidden="true">
        {shown}
        {!done && <span className="typing-cursor">|</span>}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
