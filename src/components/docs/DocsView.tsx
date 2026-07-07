"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { DocPage, DocSectionNav } from "@/src/data/docs";
import DocsPortableText from "@/src/components/docs/DocsPortableText";
import {
  extractDocHeadings,
  getAdjacentDocPages,
} from "@/src/lib/docs-nav";

type DocsViewProps = {
  sections: DocSectionNav[];
  activePage: DocPage;
};

function formatLastUpdated(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function normalizeSearch(value: string): string {
  return value.trim().toLowerCase();
}

export default function DocsView({ sections, activePage }: DocsViewProps) {
  const [query, setQuery] = useState("");
  const { previous, next } = useMemo(
    () => getAdjacentDocPages(sections, activePage.slug),
    [sections, activePage.slug],
  );
  const headings = useMemo(
    () => extractDocHeadings(activePage.body),
    [activePage.body],
  );

  const filteredSections = useMemo(() => {
    const normalized = normalizeSearch(query);
    if (!normalized) {
      return sections;
    }

    return sections
      .map((section) => ({
        ...section,
        pages: section.pages.filter((page) => {
          const haystack = [page.title, page.description ?? "", section.title]
            .join(" ")
            .toLowerCase();
          return haystack.includes(normalized);
        }),
      }))
      .filter((section) => section.pages.length > 0);
  }, [query, sections]);

  return (
    <div className="mx-auto w-full max-w-[1400px] min-[900px]:min-h-[calc(100vh-10rem)]">
      <div className="min-[900px]:flex min-[900px]:gap-0">
        <aside className="min-[900px]:sticky min-[900px]:top-28 min-[900px]:w-[248px] min-[900px]:shrink-0 min-[900px]:self-start min-[900px]:pr-6">
          <h1 className="text-[15px] font-medium tracking-[-0.02em] text-white">Docs</h1>
          <p className="mt-2 text-[13px] leading-[1.45] text-white/38">
            Technical reference and guides for Habitrades.
          </p>

          <label className="relative mt-5 block min-[900px]:mt-6">
            <span className="sr-only">Search docs</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search docs..."
              className="w-full rounded-lg bg-[#11100f] px-3 py-2.5 pr-9 text-[14px] text-white outline-none transition-colors placeholder:text-white/28 focus:bg-[#141312]"
            />
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white/30"
              fill="none"
            >
              <path
                d="M8.75 14.5a5.75 5.75 0 1 1 0-11.5 5.75 5.75 0 0 1 0 11.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="m13.5 13.5 3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </label>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-2 min-[900px]:mt-6 min-[900px]:block min-[900px]:max-h-[calc(100vh-16rem)] min-[900px]:space-y-5 min-[900px]:overflow-y-auto min-[900px]:pb-6">
            {filteredSections.length === 0 ? (
              <p className="px-1 text-[13px] text-white/35">No pages match your search.</p>
            ) : (
              filteredSections.map((section) => (
                <div key={section.slug}>
                  <p className="px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
                    {section.title}
                  </p>
                  <ul className="mt-2 space-y-0.5">
                    {section.pages.map((page) => {
                      const isActive = page.slug === activePage.slug;

                      return (
                        <li key={page.slug}>
                          <Link
                            href={`/docs/${page.slug}`}
                            className={`block rounded-md px-2.5 py-1.5 text-[14px] leading-none transition-colors ${
                              isActive
                                ? "bg-[#1b1a19] text-white"
                                : "text-white/45 hover:bg-[#141312] hover:text-white/75"
                            }`}
                          >
                            {page.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
          </nav>
        </aside>

        <section className="min-[900px]:min-w-0 min-[900px]:flex-1 min-[900px]:pl-12 min-[1200px]:pl-10">
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 min-[900px]:mt-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#b7ff4a]">
                {activePage.section.title}
              </span>
              <span className="rounded-full bg-[#141312] px-2 py-0.5 text-[11px] tracking-[-0.01em] text-white/45">
                {activePage.version}
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-white/30">
              Last updated: {formatLastUpdated(activePage.lastUpdated)}
            </p>
          </div>

          <h2 className="mt-6 text-[34px] font-normal uppercase tracking-[-0.04em] min-[810px]:text-[42px]">
            {activePage.title}
          </h2>

          {activePage.description ? (
            <p className="mt-4 max-w-[720px] text-[16px] leading-[1.55] text-white/45">
              {activePage.description}
            </p>
          ) : null}

          <div className="mt-10 min-[900px]:mt-12">
            <DocsPortableText value={activePage.body} />
          </div>

          {(previous || next) && (
            <nav
              aria-label="Docs pagination"
              className="mt-14 grid gap-3 pt-8 min-[640px]:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/docs/${previous.slug}`}
                  className="group rounded-xl bg-[#11100f] px-4 py-3.5 transition-colors hover:bg-[#141312]"
                >
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/30">
                    Previous
                  </p>
                  <p className="mt-1 text-[15px] font-medium tracking-[-0.02em] text-white/80 transition-colors group-hover:text-white">
                    {previous.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/docs/${next.slug}`}
                  className="group rounded-xl bg-[#11100f] px-4 py-3.5 text-right transition-colors hover:bg-[#141312] min-[640px]:col-start-2"
                >
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/30">
                    Next
                  </p>
                  <p className="mt-1 text-[15px] font-medium tracking-[-0.02em] text-white/80 transition-colors group-hover:text-white">
                    {next.title}
                  </p>
                </Link>
              ) : null}
            </nav>
          )}
        </section>

        {headings.length > 0 ? (
          <aside className="hidden min-[1200px]:block min-[1200px]:w-44 min-[1200px]:shrink-0">
            <div className="sticky top-28">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
                On this page
              </p>
              <ul className="mt-4 space-y-2 pl-1">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className={`block text-[13px] leading-[1.35] text-white/40 transition-colors hover:text-white/75 ${
                        heading.level === 3 ? "pl-3" : ""
                      }`}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}