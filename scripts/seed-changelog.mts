import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

type SeedEntry = {
  category: string;
  title: string;
  description: string;
};

type SeedRelease = {
  slug: string;
  date: string;
  label: string;
  title: string;
  afterHours: boolean;
  entries: SeedEntry[];
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const changelogModulePath = path.join(__dirname, "../src/data/changelog.ts");

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

function parseSeedReleases(source: string): SeedRelease[] {
  const match = source.match(
    /export const staticChangelogReleases: ChangelogRelease\[\] = (\[[\s\S]*?\]);/,
  );
  if (!match) {
    throw new Error("Could not find staticChangelogReleases array in changelog.ts");
  }

  return Function(`"use strict"; return (${match[1]});`)() as SeedRelease[];
}

async function seedRelease(release: SeedRelease) {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "changelogRelease" && slug.current == $slug][0]{ _id }`,
    { slug: release.slug },
  );

  const document = {
    _id: existing?._id,
    _type: "changelogRelease",
    date: release.date,
    slug: { _type: "slug", current: release.slug },
    label: release.label,
    afterHours: release.afterHours,
    entries: release.entries.map((entry) => ({
      _type: "changelogEntry",
      _key: crypto.randomUUID().replace(/-/g, "").slice(0, 12),
      category: entry.category,
      title: entry.title,
      description: entry.description,
    })),
  };

  if (existing?._id) {
    await client.patch(existing._id).set(document).commit();
    console.log(`Updated: ${release.slug}`);
    return;
  }

  await client.create(document);
  console.log(`Created: ${release.slug}`);
}

async function main() {
  const source = fs.readFileSync(changelogModulePath, "utf8");
  const releases = parseSeedReleases(source);

  for (const release of releases) {
    await seedRelease(release);
  }

  console.log(`Seeded ${releases.length} changelog releases.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});