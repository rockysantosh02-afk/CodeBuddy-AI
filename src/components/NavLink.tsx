import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NavLinkProps {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function NavLink({ active, onClick, children, className, icon }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
        active
          ? "bg-primary/20 text-primary glow-border"
          : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
