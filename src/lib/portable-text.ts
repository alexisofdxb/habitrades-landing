import type { PortableTextBlock } from "@portabletext/types";

type LegacySection = {
  heading?: string;
  paragraphs?: string[];
};

function makeKey(prefix: string, index: number) {
  return `${prefix}${index}`;
}

function makeTextBlock(
  text: string,
  style: "normal" | "h2" | "h3" | "h4" | "blockquote",
  key: string,
): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style,
    children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }],
    markDefs: [],
  };
}

export function sectionsToPortableText(
  sections: LegacySection[] = [],
): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];

  sections.forEach((section, sectionIndex) => {
    if (section.heading) {
      blocks.push(
        makeTextBlock(section.heading, "h2", makeKey("heading", sectionIndex)),
      );
    }

    section.paragraphs?.forEach((paragraph, paragraphIndex) => {
      blocks.push(
        makeTextBlock(
          paragraph,
          "normal",
          makeKey(`paragraph-${sectionIndex}`, paragraphIndex),
        ),
      );
    });
  });

  return blocks;
}

export const portableTextBodyProjection = `body[]{
  ...,
  _type == "block" => {
    ...,
    markDefs[]{
      ...,
      _type == "docLink" => {
        ...,
        "page": page->{
          "slug": slug.current,
          title
        }
      }
    }
  }
}`;