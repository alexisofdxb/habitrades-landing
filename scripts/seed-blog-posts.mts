import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  type: string;
  readTime: string;
  author: string;
  sections: Array<{ heading?: string; paragraphs: string[] }>;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const landingRoot = path.resolve(__dirname, "..");
const seedModulePath = path.join(landingRoot, "src/data/blog-posts.ts");

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

function parseSeedPosts(source: string): SeedPost[] {
  const match = source.match(
    /const staticBlogPostData: StaticBlogPost\[\] = (\[[\s\S]*?\]);/,
  );
  if (!match) {
    throw new Error("Could not find staticBlogPostData array in blog-posts.ts");
  }

  return Function(`"use strict"; return (${match[1]});`)() as SeedPost[];
}

function parseDisplayDate(date: string): string {
  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid date: ${date}`);
  }
  return new Date(parsed).toISOString();
}

async function uploadImage(relativePath: string) {
  const filePath = path.join(landingRoot, "public", relativePath.replace(/^\//, ""));
  const buffer = fs.readFileSync(filePath);

  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(filePath),
  });

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function seedPost(post: SeedPost) {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "post" && slug.current == $slug][0]{ _id }`,
    { slug: post.slug },
  );

  const document = {
    _id: existing?._id,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    excerpt: post.excerpt,
    type: post.type,
    readTime: post.readTime,
    author: post.author,
    publishedAt: parseDisplayDate(post.date),
    coverImage: await uploadImage(post.image),
    body: post.sections.flatMap((section, sectionIndex) => {
      const blocks: Array<Record<string, unknown>> = [];

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

      section.paragraphs.forEach((paragraph, paragraphIndex) => {
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

      return blocks;
    }),
  };

  if (existing?._id) {
    await client.patch(existing._id).set(document).commit();
    console.log(`Updated: ${post.slug}`);
    return;
  }

  await client.create(document);
  console.log(`Created: ${post.slug}`);
}

async function main() {
  const source = fs.readFileSync(seedModulePath, "utf8");
  const posts = parseSeedPosts(source);

  for (const post of posts) {
    await seedPost(post);
  }

  console.log(`Seeded ${posts.length} blog posts.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});