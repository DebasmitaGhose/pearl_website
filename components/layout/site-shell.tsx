"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PearlLogo } from "@/components/layout/pearl-logo";
import { visibleNavigation } from "@/lib/site.config";
import { cn } from "@/lib/utils";

type SiteShellProps = {
  labSubtitle: string;
  institution: string;
  children: React.ReactNode;
};

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full transition-transform",
          active
            ? "scale-125 bg-pearl-accent"
            : "bg-sidebar-foreground/30 group-hover:bg-pearl-accent/80"
        )}
      />
      {label}
    </Link>
  );
}

export function SiteShell({
  labSubtitle,
  institution,
  children,
}: SiteShellProps) {
  return (
    <div className="min-h-screen bg-canvas text-foreground lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r border-sidebar-border bg-sidebar lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:px-6 lg:py-8">
        <PearlLogo size="lg" />
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-sidebar-foreground/60">
          {institution}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-sidebar-foreground/75">
          {labSubtitle}
        </p>

        <nav className="mt-10 flex flex-col gap-1">
          {visibleNavigation.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="mt-auto pt-10 text-xs text-sidebar-foreground/50">
          Human-aligned robotics research
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between border-b border-border/60 bg-canvas/90 px-4 py-4 backdrop-blur lg:hidden">
          <PearlLogo />
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Open menu" />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-sidebar text-sidebar-foreground">
              <SheetHeader>
                <SheetTitle className="text-sidebar-foreground">PEARL</SheetTitle>
              </SheetHeader>
              <p className="text-xs uppercase tracking-widest text-sidebar-foreground/60">
                {institution}
              </p>
              <nav className="mt-6 flex flex-col gap-1">
                {visibleNavigation.map((item) => (
                  <NavLink key={item.href} href={item.href} label={item.label} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
