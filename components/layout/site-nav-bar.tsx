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
        "rounded-md px-2 py-1 text-base font-semibold tracking-wide transition-colors sm:px-2.5 sm:text-[1.05rem]",
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

export function SiteNavBar({
  variant = "default",
  className,
}: {
  variant?: "default" | "onDark";
  className?: string;
}) {
  const onDark = variant === "onDark";

  return (
    <nav
      className={cn(
        "flex flex-nowrap items-center justify-end gap-0.5 sm:gap-1",
        className
      )}
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
