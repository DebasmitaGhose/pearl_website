"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { visibleNavigation } from "@/lib/site.config";
import { cn } from "@/lib/utils";

export function MobileNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          "inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-primary-foreground/40 text-primary-foreground transition-colors hover:bg-primary-foreground/15",
          className
        )}
        aria-label="Open menu"
      >
        <Menu className="size-5" strokeWidth={2} />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="border-primary/20 bg-primary text-primary-foreground"
      >
        <SheetHeader>
          <SheetTitle className="text-primary-foreground">Menu</SheetTitle>
        </SheetHeader>
        <nav
          className="flex flex-col gap-1 px-2 pb-6"
          aria-label="Mobile navigation"
        >
          {visibleNavigation.map((item) => {
            const active =
              mounted &&
              (item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-semibold tracking-wide transition-colors",
                  active
                    ? "bg-primary-foreground text-primary"
                    : "text-primary-foreground/90 hover:bg-primary-foreground/15"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
