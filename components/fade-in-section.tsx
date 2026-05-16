"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function FadeInSection({
  children,
  id,
  delayMs = 0,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  delayMs?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      style={{
        transitionDelay: `${delayMs}ms`,
        transitionDuration: "1100ms",
      }}
      className={cn(
        "scroll-mt-16 transition-[opacity,transform] ease-out will-change-transform",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
