"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselSlide = {
  src: string;
  caption?: string;
};

const AUTOPLAY_MS = 10000;

const arrowClassName =
  "absolute top-1/2 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/40 text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-black/55";

export function HomeCarousel({
  slides,
  className,
}: {
  slides: CarouselSlide[];
  className?: string;
}) {
  const count = slides.length;
  const baseId = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);

  // Advance by clicking the visible "next" label so :has() CSS updates reliably.
  useEffect(() => {
    if (count <= 1) return;
    const root = rootRef.current;
    if (!root) return;

    const advance = () => {
      const radios = [
        ...root.querySelectorAll<HTMLInputElement>(".home-carousel-radio"),
      ];
      if (radios.length === 0) return;

      const current = Math.max(
        0,
        radios.findIndex((radio) => radio.checked)
      );
      const nextLabel = root.querySelector<HTMLLabelElement>(
        `.home-carousel-nav[data-slide="${current}"] .home-carousel-next`
      );

      if (nextLabel) {
        nextLabel.click();
        return;
      }

      const next = radios[(current + 1) % radios.length];
      next.checked = true;
      next.dispatchEvent(new Event("input", { bubbles: true }));
      next.dispatchEvent(new Event("change", { bubbles: true }));
    };

    let timer = window.setInterval(advance, AUTOPLAY_MS);

    const resetTimer = () => {
      window.clearInterval(timer);
      timer = window.setInterval(advance, AUTOPLAY_MS);
    };

    root.addEventListener("change", resetTimer);
    return () => {
      window.clearInterval(timer);
      root.removeEventListener("change", resetTimer);
    };
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
          id={`${baseId}-slide-${i}`}
          className="home-carousel-radio sr-only"
          type="radio"
          name={`${baseId}-carousel`}
          data-slide={i}
          defaultChecked={i === 0}
        />
      ))}

      <div className="relative aspect-[4/3] w-full flex-1 bg-background lg:aspect-auto lg:min-h-0">
        {slides.map((item, i) => (
          <div
            key={item.src}
            className="home-carousel-slide absolute inset-0 bg-background"
            data-slide={i}
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
          slides.map((_, i) => (
            <div
              key={`nav-${i}`}
              className="home-carousel-nav"
              data-slide={i}
            >
              <label
                htmlFor={`${baseId}-slide-${(i - 1 + count) % count}`}
                className={cn(arrowClassName, "home-carousel-prev left-3")}
                aria-label="Previous slide"
              >
                <ChevronLeft className="size-5" />
              </label>
              <label
                htmlFor={`${baseId}-slide-${(i + 1) % count}`}
                className={cn(arrowClassName, "home-carousel-next right-3")}
                aria-label="Next slide"
              >
                <ChevronRight className="size-5" />
              </label>
            </div>
          ))}
      </div>

      <div className="relative flex shrink-0 items-center justify-between gap-4 border-t border-border/40 bg-background/80 px-4 py-2 sm:px-5">
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
                htmlFor={`${baseId}-slide-${i}`}
                className="home-carousel-dot size-2 cursor-pointer rounded-full transition-all"
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
