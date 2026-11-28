"use client";

// Adapted from https://karaui.kamisama-v0.my.id/components/blocks/not-found
import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NotFoundProps = {
  className?: string;
  code?: string;
  title?: string;
  description?: string;
  homeHref?: string;
  homeLabel?: string;
  browseHref?: string;
  browseLabel?: string;
};

export function NotFoundSpotlight({
  className,
  code = "404",
  title = "Page not found",
  description = "The page you are looking for may have moved or no longer exists.",
  homeHref = "/",
  homeLabel = "Back to home",
  browseHref,
  browseLabel = "Browse",
}: NotFoundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const mask = useMotionTemplate`radial-gradient(220px circle at ${mx}% ${my}%, #000 25%, transparent 72%)`;
  const enabled = canHover && !reduceMotion;

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element || !enabled) return;
    const rect = element.getBoundingClientRect();
    mx.set(((event.clientX - rect.left) / rect.width) * 100);
    my.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-8 text-center",
        className,
      )}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        aria-hidden="true"
        className="relative isolate flex aspect-[16/9] w-full max-w-xl items-center justify-center overflow-hidden rounded-3xl border border-border bg-neutral-950"
      >
        <span className="select-none font-bold leading-none tracking-tighter text-white/50 [font-size:clamp(5rem,16vw,10rem)]">
          {code}
        </span>
        <motion.span
          style={enabled ? { WebkitMaskImage: mask, maskImage: mask } : undefined}
          className="absolute select-none font-bold leading-none tracking-tighter text-white [font-size:clamp(5rem,16vw,10rem)]"
        >
          {code}
        </motion.span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="max-w-sm text-base text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="min-h-11 px-6">
          <a href={homeHref}>{homeLabel}</a>
        </Button>
        {browseHref && (
          <Button asChild variant="outline" className="min-h-11 px-6">
            <a href={browseHref}>{browseLabel}</a>
          </Button>
        )}
      </div>
    </div>
  );
}

export default NotFoundSpotlight;
