import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostArticle from "@/src/components/BlogPostArticle";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { getAllBlogPosts, getBlogPost, getBlogPostSlugs } from "@/src/lib/blog";

export const revalidate = 60;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Post not found | Habitrades" };
  }

  return {
    title: `${post.title} | Habitrades`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPost(slug), getAllBlogPosts()]);

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="overflow-clip px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 min-[1200px]:pb-24">
        <BlogPostArticle post={post} relatedPosts={relatedPosts} />
      </main>
      <Footer />
    </>
  );
}