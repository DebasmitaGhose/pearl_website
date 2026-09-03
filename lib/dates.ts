/** Format Keystatic YYYY-MM-DD dates without UTC timezone shifting the month. */
export function formatNewsMonthYear(date: string | null | undefined) {
  if (!date) return "";
  const [year, month] = date.split("-").map(Number);
  if (!year || !month) return "";
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export function formatNewsFullDate(date: string | null | undefined) {
  if (!date) return "";
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month) return "";
  return new Date(year, month - 1, day || 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
