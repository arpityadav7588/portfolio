import { Cpu } from "lucide-react";

export function Scene3DFallback({ height = "400px" }: { height?: string }) {
  return (
    <div
      style={{ height }}
      className="flex items-center justify-center text-muted-foreground/30"
    >
      <Cpu size={48} className="animate-pulse" />
    </div>
  );
}
