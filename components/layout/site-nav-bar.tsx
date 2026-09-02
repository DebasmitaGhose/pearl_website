"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { visibleNavigation } from "@/lib/site.config";
import { cn } from "@/lib/utils";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "text-sm text-foreground/80 hover:text-foreground hover:underline",
        active && "font-medium text-foreground underline underline-offset-4"
      )}
    >
      {label}
    </Link>
  );
}

export function SiteNavBar() {
  return (
    <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Main navigation">
      {visibleNavigation.map((item) => (
        <NavLink key={item.href} href={item.href} label={item.label} />
      ))}
    </nav>
  );
}
