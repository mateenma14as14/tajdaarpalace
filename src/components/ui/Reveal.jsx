import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Fades and lifts its children into view once, the first time they are
 * scrolled to. Respects prefers-reduced-motion by rendering statically.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  className,
  as = "div",
  ...props
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const reduced = useReducedMotion();

  const MotionTag = motion[as] || motion.div;

  if (reduced) {
    const Tag = as;
    return (
      <Tag ref={ref} className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/** Reveal a list of children with a small stagger between each. */
export function RevealGroup({ children, className, step = 0.08, ...props }) {
  return (
    <div className={className} {...props}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <Reveal key={child?.key ?? i} delay={i * step}>
              {child}
            </Reveal>
          ))
        : children}
    </div>
  );
}
