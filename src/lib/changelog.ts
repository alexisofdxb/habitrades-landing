import {
  staticChangelogReleases,
  type ChangelogCategory,
  type ChangelogEntry,
  type ChangelogRelease,
} from "@/src/data/changelog";
import { isSanityConfigured, sanityClient } from "@/src/lib/sanity.client";
import {
  allChangelogReleasesQuery,
  changelogReleaseBySlugQuery,
  changelogReleaseSlugsQuery,
} from "@/src/lib/sanity.queries";

type SanityChangelogEntry = {
  category: ChangelogCategory;
  title: string;
  description: string;
};

type SanityChangelogRelease = {
  slug: string;
  date: string;
  label?: string;
  afterHours?: boolean;
  entries?: SanityChangelogEntry[];
};

function formatReleaseLabel(isoDate: string, label?: string): string {
  if (label?.trim()) {
    return label.trim();
  }

  const date = new Date(isoDate);
  return `${date.getUTCMonth() + 1}.${date.getUTCDate()}`;
}

function formatReleaseTitle(isoDate: string): string {
  const date = new Date(isoDate);
  return `${date.getUTCMonth() + 1}.${date.getUTCDate()}.${date.getUTCFullYear()}`;
}

function mapSanityRelease(release: SanityChangelogRelease): ChangelogRelease {
  const entries: ChangelogEntry[] = (release.entries ?? []).map((entry) => ({
    category: entry.category,
    title: entry.title,
    description: entry.description,
  }));

  return {
    slug: release.slug,
    date: release.date,
    label: formatReleaseLabel(release.date, release.label),
    title: formatReleaseTitle(release.date),
    afterHours: Boolean(release.afterHours),
    entries,
  };
}

function sortReleases(releases: ChangelogRelease[]): ChangelogRelease[] {
  return [...releases].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

async function fetchSanityReleases(): Promise<ChangelogRelease[]> {
  if (!sanityClient) {
    return staticChangelogReleases;
  }

  const releases = await sanityClient.fetch<SanityChangelogRelease[]>(
    allChangelogReleasesQuery,
  );

  if (!releases.length) {
    return staticChangelogReleases;
  }

  return sortReleases(releases.map(mapSanityRelease));
}

export async function getAllChangelogReleases(): Promise<ChangelogRelease[]> {
  if (!isSanityConfigured()) {
    return sortReleases(staticChangelogReleases);
  }

  return fetchSanityReleases();
}

export async function getChangelogRelease(
  slug: string,
): Promise<ChangelogRelease | undefined> {
  if (!isSanityConfigured()) {
    return staticChangelogReleases.find((release) => release.slug === slug);
  }

  if (!sanityClient) {
    return undefined;
  }

  const release = await sanityClient.fetch<SanityChangelogRelease | null>(
    changelogReleaseBySlugQuery,
    { slug },
  );

  if (release) {
    return mapSanityRelease(release);
  }

  return staticChangelogReleases.find((item) => item.slug === slug);
}

export async function getChangelogReleaseSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) {
    return staticChangelogReleases.map((release) => release.slug);
  }

  if (!sanityClient) {
    return [];
  }

  const slugs = await sanityClient.fetch<string[]>(changelogReleaseSlugsQuery);
  return slugs.length ? slugs : staticChangelogReleases.map((release) => release.slug);
}

export async function getLatestChangelogRelease(): Promise<ChangelogRelease | undefined> {
  const releases = await getAllChangelogReleases();
  return releases[0];
}

export function groupEntriesByCategory(
  entries: ChangelogEntry[],
): Array<{ category: ChangelogCategory; entries: ChangelogEntry[] }> {
  const order = new Map<ChangelogCategory, ChangelogEntry[]>();

  for (const entry of entries) {
    const bucket = order.get(entry.category) ?? [];
    bucket.push(entry);
    order.set(entry.category, bucket);
  }

  return Array.from(order.entries()).map(([category, categoryEntries]) => ({
    category,
    entries: categoryEntries,
  }));
}