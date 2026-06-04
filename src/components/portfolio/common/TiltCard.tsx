import { useRef } from "react";
import { useTilt } from "@/hooks/useTilt";

export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref);
  return (
    <div
      ref={ref}
      className={`tilt-card transition-transform duration-200 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="tilt-shine rounded-xl" />
      {children}
    </div>
  );
}
