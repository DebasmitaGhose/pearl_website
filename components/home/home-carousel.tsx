"use client";

import { useEffect, useId, useRef } from "react";
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
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const count = slides.length;

  useEffect(() => {
    if (count <= 1) return;
    const root = rootRef.current;
    if (!root) return;

    const timer = window.setInterval(() => {
      const radios = [
        ...root.querySelectorAll<HTMLInputElement>(
          'input[type="radio"].home-carousel-radio'
        ),
      ];
      if (radios.length === 0) return;
      const current = radios.findIndex((radio) => radio.checked);
      const next = (current + 1) % radios.length;
      radios[next].checked = true;
    }, 6000);

    return () => window.clearInterval(timer);
  }, [count]);

  if (count === 0) {
    return (
      <div
        className={cn(
          "flex aspect-[4/3] min-h-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-border bg-background text-muted-foreground lg:h-full lg:aspect-auto",
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

  return (
    <div
      ref={rootRef}
      className={cn(
        "home-carousel group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background lg:h-full",
        className
      )}
    >
      {slides.map((_, i) => (
        <input
          key={`radio-${i}`}
          id={`${baseId}-${i}`}
          type="radio"
          name={baseId}
          value={i}
          defaultChecked={i === 0}
          className="home-carousel-radio sr-only"
          data-slide={i}
          aria-label={`Show slide ${i + 1}`}
        />
      ))}

      <div className="relative aspect-[4/3] w-full flex-1 bg-background lg:aspect-auto lg:min-h-0">
        {slides.map((item, i) => (
          <div
            key={item.src}
            className="home-carousel-slide absolute inset-0 bg-background transition-opacity duration-700 ease-out"
            data-slide={i}
            aria-hidden
          >
            <Image
              src={item.src}
              alt={item.caption || "PEARL lab"}
              fill
              unoptimized
              className="bg-background object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority={i === 0}
            />
          </div>
        ))}

        {count > 1 &&
          slides.map((_, i) => {
            const prev = (i - 1 + count) % count;
            const next = (i + 1) % count;
            return (
              <div
                key={`nav-${i}`}
                className="home-carousel-nav absolute inset-0 z-20"
                data-slide={i}
              >
                <label
                  htmlFor={`${baseId}-${prev}`}
                  className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/40 text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-black/55"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="size-5" />
                </label>
                <label
                  htmlFor={`${baseId}-${next}`}
                  className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/40 text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-black/55"
                  aria-label="Next slide"
                >
                  <ChevronRight className="size-5" />
                </label>
              </div>
            );
          })}
      </div>

      <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border/40 bg-background/80 px-4 py-2 sm:px-5">
        <div className="min-w-0 flex-1">
          {slides.map((item, i) => (
            <p
              key={`caption-${i}`}
              className="home-carousel-caption text-sm text-muted-foreground"
              data-slide={i}
            >
              {item.caption || ""}
            </p>
          ))}
        </div>
        {count > 1 && (
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <label
                key={`dot-${i}`}
                htmlFor={`${baseId}-${i}`}
                className="home-carousel-dot size-2 cursor-pointer rounded-full transition-all hover:bg-muted-foreground/50"
                data-slide={i}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
