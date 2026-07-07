import Image from "next/image";
import Link from "next/link";
import DocsPortableText from "@/src/components/docs/DocsPortableText";
import type { BlogPost } from "@/src/data/blog-posts";
import { getBlogCategoryLabel } from "@/src/data/blog-posts";

type BlogPostArticleProps = {
  post: BlogPost;
  relatedPosts: BlogPost[];
};

export default function BlogPostArticle({ post, relatedPosts }: BlogPostArticleProps) {

  return (
    <article className="mx-auto w-full max-w-[760px]">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-[14px] text-white/45 transition-colors hover:text-white"
      >
        <span aria-hidden>←</span>
        Back to blog
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-3 text-[12px] tracking-[-0.02em] text-white/40">
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-white/70">
          {getBlogCategoryLabel(post.type)}
        </span>
        <span>{post.date}</span>
        <span>{post.readTime}</span>
        <span>{post.author}</span>
      </div>

      <h1 className="mt-6 text-[36px] font-normal leading-[1.08] tracking-[-0.04em] min-[810px]:text-[48px]">
        {post.title}
      </h1>

      <p className="mt-5 text-[18px] leading-[1.45] text-white/50">{post.excerpt}</p>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-white/8 bg-[#111]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 760px) 100vw, 760px"
          className="object-cover"
        />
      </div>

      <div className="mt-12">
        <DocsPortableText value={post.body} />
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-16 border-t border-white/8 pt-10">
          <h2 className="text-[20px] font-medium tracking-[-0.03em]">More articles</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedPosts.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="rounded-xl border border-white/8 bg-[#11100f] p-4 transition-colors hover:border-white/14 hover:bg-[#141312]"
              >
                <p className="text-[11px] uppercase tracking-[0.12em] text-white/35">
                  {getBlogCategoryLabel(item.type)}
                </p>
                <h3 className="mt-2 text-[15px] font-medium leading-[1.3] tracking-[-0.02em]">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}