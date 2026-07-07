"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getBlogCategoryLabel, type BlogPost } from "@/src/data/blog-posts";

function BlogVisual({
  image,
  title,
  typeLabel,
}: {
  image: string;
  title: string;
  typeLabel: string;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#151515]">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 767px) calc(100vw - 32px), 360px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[11px] font-medium tracking-[-0.02em] text-white/80 backdrop-blur-sm">
        {typeLabel}
      </span>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 9h10" />
      <path d="M10 5l4 4-4 4" />
    </svg>
  );
}

type ThreeWaysProps = {
  posts: BlogPost[];
};

export default function ThreeWays({ posts }: ThreeWaysProps) {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : { opacity: 0, y: 34, filter: "blur(8px)" };
  const animate = { opacity: 1, y: 0, filter: "blur(0px)" };
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section id="blog" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 min-[1200px]:py-36">
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition}
          className="flex flex-col gap-6 min-[760px]:flex-row min-[760px]:items-end min-[760px]:justify-between"
        >
          <div>
            <p className="text-sm leading-[1.3] text-[#858585]">
              <span className="text-white/35">{`// `}</span>
              Blog
            </p>
            <h2 className="mt-4 text-[32px] leading-[1.12] tracking-[-0.03em] min-[810px]:text-[36px] min-[1200px]:text-[36px]">
              <span className="block font-medium text-white">Latest from Habitrades.</span>
              <span className="block font-normal text-[#858585]">
                Ideas, guides, and product updates.
              </span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/10 px-4 text-[14px] font-medium text-white transition-colors hover:border-white/20 hover:bg-white/5"
          >
            View all posts
            <ArrowIcon />
          </Link>
        </motion.div>

        <div className="mt-10 grid gap-10 min-[760px]:mt-14 min-[760px]:grid-cols-3 min-[760px]:items-stretch min-[760px]:gap-4 min-[1000px]:gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={initial}
              whileInView={animate}
              viewport={{ once: true, margin: "-70px" }}
              transition={{
                ...transition,
                delay: shouldReduceMotion ? 0 : index * 0.08,
              }}
              style={{ willChange: "transform, opacity, filter" }}
              className="flex h-full flex-col"
            >
              <BlogVisual
                image={post.image}
                title={post.title}
                typeLabel={getBlogCategoryLabel(post.type)}
              />
              <div className="flex flex-1 flex-col pt-5">
                <p className="text-[12px] tracking-[-0.02em] text-white/35">{post.date}</p>
                <h3 className="mt-2 line-clamp-2 min-h-[46px] text-[20px] font-medium leading-[1.15] tracking-[-0.04em]">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 min-h-[60px] flex-1 text-[14px] leading-[1.35] tracking-[-0.02em] text-[#858585]">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto inline-flex h-10 w-fit items-center gap-2 rounded-lg bg-[#141312] px-3.5 text-[14px] font-medium tracking-[-0.02em] text-white/85 transition-colors hover:bg-[#171615] hover:text-white"
                >
                  <span>Read article</span>
                  <ArrowIcon />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}