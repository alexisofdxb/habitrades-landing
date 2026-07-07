"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  blogFilters,
  blogTypeMeta,
  getBlogCategoryLabel,
  type BlogFilterId,
  type BlogPost,
} from "@/src/data/blog-posts";

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/8 bg-[#111]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 760px) 100vw, 340px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
            {getBlogCategoryLabel(post.type)}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[12px] tracking-[-0.02em] text-white/35">
          {post.date} · {post.readTime}
        </p>
        <h2 className="mt-2 text-[20px] font-medium leading-[1.15] tracking-[-0.04em]">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-white/80">
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 flex-1 text-[14px] leading-[1.4] text-[#858585]">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex w-fit items-center gap-2 text-[14px] font-medium text-white transition-colors hover:text-white/70"
        >
          Read more
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

type BlogIndexProps = {
  posts: BlogPost[];
};

export default function BlogIndex({ posts }: BlogIndexProps) {
  const [activeFilter, setActiveFilter] = useState<BlogFilterId>("all");

  const filteredPosts = useMemo(() => {
    if (activeFilter === "all") return posts;
    return posts.filter((post) => post.type === activeFilter);
  }, [activeFilter, posts]);

  const featuredPost = posts[0];

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <div className="max-w-3xl">
        <p className="text-sm leading-[1.3] text-[#858585]">
          <span className="text-white/35">{`// `}</span>
          Blog
        </p>
        <h1 className="mt-4 text-[36px] font-normal leading-[1.1] tracking-[-0.04em] min-[810px]:text-[48px]">
          Updates, guides, and changelog.
        </h1>
        <p className="mt-4 text-[16px] leading-[1.5] text-white/45">
          Product news, release notes, trading guides, and platform announcements from Habitrades.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {blogFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
              activeFilter === filter.id
                ? "bg-white text-[#111]"
                : "bg-[#171615] text-white/55 hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {activeFilter === "all" && featuredPost && (
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="group mt-10 block overflow-hidden rounded-2xl border border-white/8 bg-[#11100f] transition-colors hover:border-white/14"
        >
          <div className="grid min-[900px]:grid-cols-[1.15fr_1fr]">
            <div className="relative min-h-[240px] min-[900px]:min-h-[320px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 620px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <p className="text-[12px] uppercase tracking-[0.14em] text-[#b7ff4a]">Featured</p>
              <p className="mt-3 text-[12px] text-white/35">
                {getBlogCategoryLabel(featuredPost.type)} · {featuredPost.date}
              </p>
              <h2 className="mt-3 text-[28px] font-medium leading-[1.12] tracking-[-0.03em]">
                {featuredPost.title}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.45] text-white/45">{featuredPost.excerpt}</p>
            </div>
          </div>
        </Link>
      )}

      {activeFilter !== "all" && (
        <p className="mt-8 text-[14px] text-white/40">
          {blogTypeMeta[activeFilter].description}
        </p>
      )}

      <div className="mt-10 grid gap-8 sm:grid-cols-2 min-[1000px]:grid-cols-3">
        {(activeFilter === "all" ? filteredPosts.slice(1) : filteredPosts).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="mt-10 text-center text-white/40">No posts in this category yet.</p>
      )}
    </div>
  );
}