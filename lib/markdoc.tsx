import Markdoc from "@markdoc/markdoc";
import React from "react";

// Keystatic bundles its own @markdoc/markdoc copy; keep types loose at the boundary.
type MarkdocContent = () => Promise<{ node: unknown }>;

export async function renderMarkdoc(content: MarkdocContent) {
  const { node } = await content();
  const markdocNode = node as Parameters<typeof Markdoc.validate>[0];
  const errors = Markdoc.validate(markdocNode);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid markdoc content");
  }
  const renderable = Markdoc.transform(markdocNode);
  return Markdoc.renderers.react(renderable, React);
}
