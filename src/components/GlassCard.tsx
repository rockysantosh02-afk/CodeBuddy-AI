import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, hover = false, glow = false, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass rounded-xl p-4",
        hover && "card-hover cursor-pointer",
        glow && "glow-border",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
