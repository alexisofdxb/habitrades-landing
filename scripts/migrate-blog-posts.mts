import { createClient } from "@sanity/client";

type LegacySection = {
  heading?: string;
  paragraphs?: string[];
};

type SanityPost = {
  _id: string;
  title: string;
  body?: Array<Record<string, unknown>>;
  sections?: LegacySection[];
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in environment.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

function sectionsToBody(sections: LegacySection[] = []) {
  const blocks: Array<Record<string, unknown>> = [];

  sections.forEach((section, sectionIndex) => {
    if (section.heading) {
      blocks.push({
        _type: "block",
        _key: `heading-${sectionIndex}`,
        style: "h2",
        children: [
          {
            _type: "span",
            _key: `heading-${sectionIndex}-span`,
            text: section.heading,
            marks: [],
          },
        ],
        markDefs: [],
      });
    }

    section.paragraphs?.forEach((paragraph, paragraphIndex) => {
      blocks.push({
        _type: "block",
        _key: `paragraph-${sectionIndex}-${paragraphIndex}`,
        style: "normal",
        children: [
          {
            _type: "span",
            _key: `paragraph-${sectionIndex}-${paragraphIndex}-span`,
            text: paragraph,
            marks: [],
          },
        ],
        markDefs: [],
      });
    });
  });

  return blocks;
}

async function main() {
  const posts = await client.fetch<SanityPost[]>(
    `*[_type == "post" && defined(sections)]{ _id, title, body, sections }`,
  );

  if (!posts.length) {
    console.log("No posts with legacy sections found.");
    return;
  }

  for (const post of posts) {
    const body =
      post.body?.length && post.body.length > 0
        ? post.body
        : sectionsToBody(post.sections);

    await client
      .patch(post._id)
      .set({ body })
      .unset(["sections"])
      .commit();

    console.log(`Migrated: ${post.title}`);
  }

  console.log(`Migrated ${posts.length} post(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});