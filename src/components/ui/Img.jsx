import { useState } from "react";
import { img } from "../../data/images";
import { cn } from "../../lib/utils";

/**
 * Image with a soft blush placeholder that cross-fades once the file loads,
 * so grids never flash white while scrolling.
 *
 * Pass either `id` (an Unsplash photo id from data/images.js) or `src`
 * (any URL or local path) — `src` wins if both are given.
 */
export default function Img({
  id,
  src,
  alt = "",
  width = 1200,
  height = 800,
  className,
  imgClassName,
  priority = false,
  children,
}) {
  const [loaded, setLoaded] = useState(false);
  const resolved = src || (id ? img(id, width, height) : "");

  return (
    <div className={cn("relative overflow-hidden bg-blush-100", className)}>
      <img
        src={resolved}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-700 ease-soft",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName,
        )}
      />

      {/* Placeholder shimmer, removed from the a11y tree */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br from-blush-100 via-cream-100 to-blush-200 transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100",
        )}
      />

      {children}
    </div>
  );
}
