import type { Metadata } from "next";
import BlogIndex from "@/src/components/BlogIndex";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { getAllBlogPosts } from "@/src/lib/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | Habitrades",
  description:
    "Product updates, changelog entries, news, guides, and announcements from Habitrades.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <Navbar />
      <main className="overflow-clip px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 min-[1200px]:pb-24">
        <BlogIndex posts={posts} />
      </main>
      <Footer />
    </>
  );
}