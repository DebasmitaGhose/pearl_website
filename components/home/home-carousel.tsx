"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselSlide = {
  src: string;
  caption?: string;
};

export function HomeCarousel({
  slides,
  className,
}: {
  slides: CarouselSlide[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex((next + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(() => go(index + 1), 6000);
    return () => window.clearInterval(timer);
  }, [count, index, go]);

  if (count === 0) {
    return (
      <div
        className={cn(
          "flex h-[240px] flex-col items-center justify-center gap-2 border border-border bg-muted text-muted-foreground sm:h-[290px] lg:h-[320px]",
          className
        )}
        aria-label="Image carousel placeholder"
      >
        <ImageIcon className="size-10 opacity-40" strokeWidth={1.25} />
        <p className="text-sm">Hero images appear here</p>
        <p className="text-xs opacity-70">
          Add slides in Keystatic → Home page → Hero carousel images
        </p>
      </div>
    );
  }

  const slide = slides[index];

  return (
    <div
      className={cn(
        "group relative overflow-hidden border border-border bg-muted",
        className
      )}
    >
      <div className="relative h-[240px] w-full sm:h-[290px] lg:h-[320px]">
        {slides.map((item, i) => (
          <div
            key={item.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <Image
              src={item.src}
              alt={item.caption || "PEARL lab"}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority={i === 0}
            />
          </div>
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/40"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/40"
              aria-label="Next slide"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {(slide.caption || count > 1) && (
        <div className="flex items-center justify-between gap-4 border-t border-border/40 bg-background/80 px-4 py-2 sm:px-5">
          <p className="text-sm text-muted-foreground">
            {slide.caption || ""}
          </p>
          {count > 1 && (
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "size-2 rounded-full transition-all",
                    i === index
                      ? "w-6 bg-primary"
                      : "bg-border hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
