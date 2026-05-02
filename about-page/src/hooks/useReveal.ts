import { useEffect, useRef } from "react";

/**
 * Reveal-on-scroll hook. Threshold + rootMargin match the homepage's
 * IntersectionObserver values (index.html `.fade-up` observer) so reveals
 * trigger at the same scroll position on both surfaces.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.08,
  rootMargin = "0px 0px -32px 0px",
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
