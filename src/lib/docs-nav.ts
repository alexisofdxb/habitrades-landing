import type { PortableTextBlock } from "@portabletext/types";
import type { DocPageSummary, DocSectionNav } from "@/src/data/docs";

export type DocNavItem = DocPageSummary & {
  sectionTitle: string;
};

export type DocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

function blockId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function flattenDocsNav(sections: DocSectionNav[]): DocNavItem[] {
  return sections.flatMap((section) =>
    section.pages.map((page) => ({
      ...page,
      sectionTitle: section.title,
    })),
  );
}

export function getAdjacentDocPages(
  sections: DocSectionNav[],
  activeSlug: string,
): { previous?: DocNavItem; next?: DocNavItem } {
  const flat = flattenDocsNav(sections);
  const index = flat.findIndex((page) => page.slug === activeSlug);

  if (index === -1) {
    return {};
  }

  return {
    previous: index > 0 ? flat[index - 1] : undefined,
    next: index < flat.length - 1 ? flat[index + 1] : undefined,
  };
}

export function extractDocHeadings(body: PortableTextBlock[]): DocHeading[] {
  return body.flatMap((block) => {
    if (block._type !== "block") {
      return [];
    }

    const style = block.style;
    if (style !== "h2" && style !== "h3") {
      return [];
    }

    const text =
      block.children
        ?.map((child) => ("text" in child ? child.text : ""))
        .join("") ?? "";

    if (!text) {
      return [];
    }

    return [
      {
        id: blockId(text),
        text,
        level: style === "h2" ? 2 : 3,
      },
    ];
  });
}