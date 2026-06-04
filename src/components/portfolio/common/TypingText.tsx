import { useEffect, useState } from "react";

export function TypingText({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index < text.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + text[index]);
        setIndex((p) => p + 1);
      }, speed);
      return () => clearTimeout(t);
    }
  }, [index, text, speed]);
  return (
    <span>
      {displayed}
      {index < text.length && <span className="animate-pulse text-primary">|</span>}
    </span>
  );
}
