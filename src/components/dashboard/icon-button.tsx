import { cn } from "@/lib/utils";
import type { IconButtonProps } from "@/types/components";

export function IconButton({ icon, variant = "square" }: IconButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center text-slate-400 transition-colors hover:bg-[#222a3d] hover:text-white",
        variant === "round" ? "h-10 w-10 rounded-full" : "rounded-lg p-2",
      )}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}
