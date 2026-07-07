"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  changelogCategoryMeta,
  changelogCategoryToneClass,
  type ChangelogRelease,
} from "@/src/data/changelog";

type ChangelogViewProps = {
  releases: ChangelogRelease[];
  activeRelease: ChangelogRelease;
};

function releaseHref(release: ChangelogRelease, latestSlug?: string) {
  return release.slug === latestSlug ? "/changelog" : `/changelog/${release.slug}`;
}

export default function ChangelogView({
  releases,
  activeRelease,
}: ChangelogViewProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const latestSlug = releases[0]?.slug;

  const displayRelease = useMemo(() => {
    if (hoveredSlug) {
      return releases.find((release) => release.slug === hoveredSlug) ?? activeRelease;
    }
    return activeRelease;
  }, [activeRelease, hoveredSlug, releases]);

  const isPreviewing =
    hoveredSlug !== null && hoveredSlug !== activeRelease.slug;

  return (
    <div className="mx-auto w-full max-w-[1280px] min-[900px]:min-h-[calc(100vh-10rem)]">
      <div className="min-[900px]:flex min-[900px]:gap-0">
        <aside
          className="min-[900px]:sticky min-[900px]:top-28 min-[900px]:w-[196px] min-[900px]:shrink-0 min-[900px]:self-start min-[900px]:border-r min-[900px]:border-white/8 min-[900px]:pr-6"
          onMouseLeave={() => setHoveredSlug(null)}
        >
          <h1 className="text-[15px] font-medium tracking-[-0.02em] text-white">
            Changelog
          </h1>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-2 min-[900px]:mt-6 min-[900px]:block min-[900px]:max-h-[calc(100vh-12rem)] min-[900px]:space-y-0.5 min-[900px]:overflow-y-auto min-[900px]:pb-6">
            {releases.map((release) => {
              const isHighlighted = hoveredSlug
                ? release.slug === hoveredSlug
                : release.slug === activeRelease.slug;

              return (
                <Link
                  key={release.slug}
                  href={releaseHref(release, latestSlug)}
                  onMouseEnter={() => setHoveredSlug(release.slug)}
                  onFocus={() => setHoveredSlug(release.slug)}
                  onBlur={() => setHoveredSlug(null)}
                  className={`flex shrink-0 items-baseline gap-2 rounded-md px-2.5 py-1.5 text-[14px] leading-none transition-colors min-[900px]:w-full ${
                    isHighlighted
                      ? "bg-[#1b1a19] text-white"
                      : "text-white/45 hover:bg-[#141312] hover:text-white/75"
                  }`}
                >
                  <span className="font-medium tracking-[-0.02em]">{release.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="min-[900px]:min-w-0 min-[900px]:flex-1 min-[900px]:pl-12">
          <p className="mt-8 text-[15px] leading-[1.45] text-white/42 min-[900px]:mt-0">
            Release notes across agents, markets, and platform.
          </p>

          <div
            className={`mt-8 transition-opacity duration-200 min-[900px]:mt-10 ${
              isPreviewing ? "opacity-80" : "opacity-100"
            }`}
          >
            <h2 className="text-[34px] font-normal tracking-[-0.04em] min-[810px]:text-[42px]">
              {displayRelease.title}
            </h2>

            <ul className="mt-8 space-y-5 min-[900px]:mt-10 min-[900px]:space-y-6">
              {displayRelease.entries.map((entry) => {
                const meta = changelogCategoryMeta[entry.category];
                const dotClass = changelogCategoryToneClass[meta.tone];

                return (
                  <li key={`${displayRelease.slug}-${entry.category}-${entry.title}`}>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#171615] px-2.5 py-1">
                      <span
                        className={`size-2 shrink-0 rounded-full ${dotClass}`}
                        aria-hidden
                      />
                      <span className="text-[13px] font-medium tracking-[-0.02em] text-white/90">
                        {meta.label}
                      </span>
                    </span>
                    <p className="mt-3 text-[15px] font-medium leading-[1.35] tracking-[-0.02em] text-white">
                      {entry.title}
                    </p>
                    <p className="mt-1.5 max-w-[720px] text-[14px] leading-[1.55] text-white/48">
                      {entry.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}