import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

/** Read-only star rating. */
export default function Rating({ value = 5, size = "sm", className }) {
  const px = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div
      className={cn("flex items-center gap-0.5 text-gold-400", className)}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(px, i < value ? "fill-current" : "opacity-30")}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
