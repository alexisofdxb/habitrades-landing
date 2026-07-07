import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocsView from "@/src/components/docs/DocsView";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { getDocPage, getDocPageSlugs, getDocsNav } from "@/src/lib/docs";

export const revalidate = 60;

type DocsPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getDocPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getDocPage(slug);

  if (!page) {
    return { title: "Page not found | Habitrades Docs" };
  }

  return {
    title: `${page.title} | Habitrades Docs`,
    description: page.description ?? `Habitrades documentation — ${page.title}`,
  };
}

export default async function DocsSlugPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const [sections, page] = await Promise.all([getDocsNav(), getDocPage(slug)]);

  if (!page) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="overflow-clip px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 min-[900px]:px-10 min-[1200px]:pb-24">
        <DocsView sections={sections} activePage={page} />
      </main>
      <Footer />
    </>
  );
}