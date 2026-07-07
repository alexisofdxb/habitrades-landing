import type { PortableTextBlock } from "@portabletext/types";
import {
  defaultDocSlug,
  staticDocPages,
  staticDocSections,
  type DocPage,
  type DocSectionNav,
} from "@/src/data/docs";
import { isSanityConfigured, sanityClient } from "@/src/lib/sanity.client";
import {
  docNavQuery,
  docPageBySlugQuery,
  docPageSlugsQuery,
} from "@/src/lib/sanity.queries";

type SanityDocPageSummary = {
  slug: string;
  title: string;
  order: number;
  version: string;
  lastUpdated: string;
  description?: string;
};

type SanityDocSectionNav = {
  slug: string;
  title: string;
  order: number;
  pages: SanityDocPageSummary[];
};

type SanityDocPage = SanityDocPageSummary & {
  section: {
    slug: string;
    title: string;
  };
  body: PortableTextBlock[];
};

function mapDocPage(page: SanityDocPage): DocPage {
  return {
    slug: page.slug,
    title: page.title,
    order: page.order,
    version: page.version,
    lastUpdated: page.lastUpdated,
    description: page.description,
    section: page.section,
    body: page.body ?? [],
  };
}

function mapDocNav(sections: SanityDocSectionNav[]): DocSectionNav[] {
  return sections
    .filter((section) => section.pages?.length)
    .map((section) => ({
      slug: section.slug,
      title: section.title,
      order: section.order,
      pages: [...(section.pages ?? [])].sort((a, b) => a.order - b.order),
    }));
}

async function fetchSanityDocNav(): Promise<DocSectionNav[]> {
  if (!sanityClient) {
    return staticDocSections;
  }

  const sections = await sanityClient.fetch<SanityDocSectionNav[]>(docNavQuery);
  if (!sections.length) {
    return staticDocSections;
  }

  const nav = mapDocNav(sections);
  return nav.length ? nav : staticDocSections;
}

export async function getDocsNav(): Promise<DocSectionNav[]> {
  if (!isSanityConfigured()) {
    return staticDocSections;
  }

  return fetchSanityDocNav();
}

export async function getDocPage(slug: string): Promise<DocPage | undefined> {
  if (!isSanityConfigured()) {
    return staticDocPages.find((page) => page.slug === slug);
  }

  if (!sanityClient) {
    return undefined;
  }

  const page = await sanityClient.fetch<SanityDocPage | null>(docPageBySlugQuery, {
    slug,
  });

  if (page?.section) {
    return mapDocPage(page);
  }

  return staticDocPages.find((item) => item.slug === slug);
}

export async function getDocPageSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) {
    return staticDocPages.map((page) => page.slug);
  }

  if (!sanityClient) {
    return [];
  }

  const slugs = await sanityClient.fetch<string[]>(docPageSlugsQuery);
  return slugs.length ? slugs : staticDocPages.map((page) => page.slug);
}

export async function getDefaultDocSlug(): Promise<string> {
  const nav = await getDocsNav();
  const firstPage = nav[0]?.pages[0]?.slug;
  return firstPage ?? defaultDocSlug;
}