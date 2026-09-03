"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { visibleNavigation } from "@/lib/site.config";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  label,
  onDark,
}: {
  href: string;
  label: string;
  onDark?: boolean;
}) {
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
        "rounded-md px-3 py-2 text-[0.95rem] font-semibold tracking-wide transition-colors sm:px-3.5 sm:text-lg",
        onDark
          ? active
            ? "bg-primary-foreground text-primary shadow-sm"
            : "text-primary-foreground/80 hover:bg-primary-foreground/15 hover:text-primary-foreground"
          : active
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-foreground/70 hover:bg-secondary hover:text-primary"
      )}
    >
      {label}
    </Link>
  );
}

export function SiteNavBar({ variant = "default" }: { variant?: "default" | "onDark" }) {
  const onDark = variant === "onDark";

  return (
    <nav
      className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2"
      aria-label="Main navigation"
    >
      {visibleNavigation.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
          onDark={onDark}
        />
      ))}
    </nav>
  );
}
