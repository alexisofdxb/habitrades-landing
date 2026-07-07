import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  staticBlogPosts,
  type BlogPost,
  type BlogPostType,
} from "@/src/data/blog-posts";
import { isSanityConfigured, sanityClient } from "@/src/lib/sanity.client";
import { urlForImage } from "@/src/lib/sanity.image";
import { sectionsToPortableText } from "@/src/lib/portable-text";
import { allPostsQuery, postBySlugQuery, postSlugsQuery } from "@/src/lib/sanity.queries";

type SanityPostSection = {
  heading?: string;
  paragraphs?: string[];
};

type SanityPost = {
  slug: string;
  title: string;
  excerpt: string;
  type: BlogPostType;
  readTime: string;
  author: string;
  publishedAt: string;
  coverImage?: SanityImageSource;
  body?: PortableTextBlock[];
  sections?: SanityPostSection[];
};

function formatPostDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function mapSanityPost(post: SanityPost): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    image: post.coverImage
      ? urlForImage(post.coverImage).width(1400).height(900).url()
      : "/images/hero-dashboard.png",
    date: formatPostDate(post.publishedAt),
    type: post.type,
    readTime: post.readTime,
    author: post.author,
    body:
      post.body?.length
        ? post.body
        : sectionsToPortableText(post.sections ?? []),
  };
}

async function fetchSanityPosts(): Promise<BlogPost[]> {
  if (!sanityClient) {
    return staticBlogPosts;
  }

  const posts = await sanityClient.fetch<SanityPost[]>(allPostsQuery);
  if (!posts.length) {
    return staticBlogPosts;
  }

  return posts.map(mapSanityPost);
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) {
    return staticBlogPosts;
  }

  return fetchSanityPosts();
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  if (!isSanityConfigured()) {
    return staticBlogPosts.find((post) => post.slug === slug);
  }

  if (!sanityClient) {
    return undefined;
  }

  const post = await sanityClient.fetch<SanityPost | null>(postBySlugQuery, { slug });
  if (post) {
    return mapSanityPost(post);
  }

  return staticBlogPosts.find((item) => item.slug === slug);
}

export async function getBlogPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) {
    return staticBlogPosts.map((post) => post.slug);
  }

  if (!sanityClient) {
    return [];
  }

  const slugs = await sanityClient.fetch<string[]>(postSlugsQuery);
  return slugs.length ? slugs : staticBlogPosts.map((post) => post.slug);
}

export async function getLatestBlogPosts(count = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.slice(0, count);
}