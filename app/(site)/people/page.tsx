"use client";

import { useEffect } from "react";

export default function PeopleRedirectPage() {
  useEffect(() => {
    window.location.replace("/team");
  }, []);

  return (
    <p className="mx-auto max-w-5xl px-4 py-10 text-sm text-muted-foreground">
      Redirecting to Team…
    </p>
  );
}
