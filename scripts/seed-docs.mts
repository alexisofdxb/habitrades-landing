import { createClient } from "@sanity/client";
import { staticDocPages, staticDocSections } from "../src/data/docs";

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

async function seedSection(section: (typeof staticDocSections)[number]) {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "docSection" && slug.current == $slug][0]{ _id }`,
    { slug: section.slug },
  );

  const document = {
    _id: existing?._id,
    _type: "docSection",
    title: section.title,
    slug: { _type: "slug", current: section.slug },
    order: section.order,
  };

  if (existing?._id) {
    await client.patch(existing._id).set(document).commit();
    console.log(`Updated section: ${section.slug}`);
    return existing._id;
  }

  const created = await client.create(document);
  console.log(`Created section: ${section.slug}`);
  return created._id;
}

async function seedPage(
  page: (typeof staticDocPages)[number],
  sectionId: string,
) {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "docPage" && slug.current == $slug][0]{ _id }`,
    { slug: page.slug },
  );

  const document = {
    _id: existing?._id,
    _type: "docPage",
    title: page.title,
    slug: { _type: "slug", current: page.slug },
    section: {
      _type: "reference",
      _ref: sectionId,
    },
    order: page.order,
    version: page.version,
    lastUpdated: page.lastUpdated,
    description: page.description,
    body: page.body,
  };

  if (existing?._id) {
    await client.patch(existing._id).set(document).commit();
    console.log(`Updated page: ${page.slug}`);
    return;
  }

  await client.create(document);
  console.log(`Created page: ${page.slug}`);
}

async function main() {
  const sectionIds = new Map<string, string>();

  for (const section of staticDocSections) {
    const id = await seedSection(section);
    sectionIds.set(section.slug, id);
  }

  for (const page of staticDocPages) {
    const sectionId = sectionIds.get(page.section.slug);
    if (!sectionId) {
      throw new Error(`Missing section id for ${page.section.slug}`);
    }
    await seedPage(page, sectionId);
  }

  console.log(`Seeded ${staticDocSections.length} sections and ${staticDocPages.length} pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});