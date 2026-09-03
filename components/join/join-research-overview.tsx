import { joinResearchOverview } from "@/lib/join-opportunities";
import { JoinInline } from "@/components/join/join-inline";

export function JoinResearchOverview() {
  const overview = joinResearchOverview;

  return (
    <section className="mb-10 space-y-4 text-base leading-relaxed text-muted-foreground">
      <h2 className="font-display text-xl font-semibold text-primary">
        {overview.title}
      </h2>

      {overview.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <p>
        <JoinInline parts={overview.skillsIntro} />
      </p>

      <ul className="list-disc space-y-3 pl-5">
        {overview.skillAreas.map((area) => (
          <li key={area.title} className="pl-1">
            <span className="font-medium text-foreground">{area.title}</span>{" "}
            {area.body}
          </li>
        ))}
      </ul>

      <p>{overview.closing}</p>
    </section>
  );
}
