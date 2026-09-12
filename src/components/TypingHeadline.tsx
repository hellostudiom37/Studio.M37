"use client";

import { useEffect, useRef, useState } from "react";

const TYPE_SPEED = 55;
const DELETE_SPEED = 32;
const PAUSE_FULL = 1800;
const PAUSE_EMPTY = 500;

export default function TypingHeadline({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState("");
  const direction = useRef<"typing" | "deleting">("typing");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      setDisplay((current) => {
        if (direction.current === "typing") {
          if (current.length < text.length) {
            timer = setTimeout(tick, TYPE_SPEED);
            return text.slice(0, current.length + 1);
          }
          direction.current = "deleting";
          timer = setTimeout(tick, PAUSE_FULL);
          return current;
        }

        if (current.length > 0) {
          timer = setTimeout(tick, DELETE_SPEED);
          return current.slice(0, -1);
        }
        direction.current = "typing";
        timer = setTimeout(tick, PAUSE_EMPTY);
        return current;
      });
    };

    timer = setTimeout(tick, TYPE_SPEED);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {display}
        <span className="typing-cursor">|</span>
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
