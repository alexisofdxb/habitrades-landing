import Link from "next/link";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";

export default function BlogPostNotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-28 text-center sm:px-6">
        <p className="text-sm text-white/40">404</p>
        <h1 className="mt-3 text-[32px] font-medium tracking-[-0.03em]">Article not found</h1>
        <p className="mt-3 max-w-md text-white/45">
          This blog post does not exist or may have been moved.
        </p>
        <Link
          href="/blog"
          className="mt-8 rounded-lg bg-white px-4 py-3 text-sm font-medium text-[#111] transition-transform hover:scale-[1.025]"
        >
          Back to blog
        </Link>
      </main>
      <Footer />
    </>
  );
}