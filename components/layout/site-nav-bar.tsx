"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { visibleNavigation } from "@/lib/site.config";
import { cn } from "@/lib/utils";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const active =
    mounted &&
    (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "text-sm transition-colors",
        active
          ? "font-medium text-primary"
          : "text-muted-foreground hover:text-primary"
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
