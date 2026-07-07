import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChangelogView from "@/src/components/ChangelogView";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import {
  getAllChangelogReleases,
  getChangelogRelease,
  getChangelogReleaseSlugs,
} from "@/src/lib/changelog";

export const revalidate = 60;

type ChangelogReleasePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getChangelogReleaseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ChangelogReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = await getChangelogRelease(slug);

  if (!release) {
    return { title: "Release not found | Habitrades" };
  }

  return {
    title: `Changelog ${release.title} | Habitrades`,
    description: `Product updates shipped on ${release.title}.`,
  };
}

export default async function ChangelogReleasePage({ params }: ChangelogReleasePageProps) {
  const { slug } = await params;
  const [releases, release] = await Promise.all([
    getAllChangelogReleases(),
    getChangelogRelease(slug),
  ]);

  if (!release) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="overflow-clip px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 min-[900px]:px-10 min-[1200px]:pb-24">
        <ChangelogView releases={releases} activeRelease={release} />
      </main>
      <Footer />
    </>
  );
}