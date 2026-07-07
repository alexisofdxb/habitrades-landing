import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChangelogView from "@/src/components/ChangelogView";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { getAllChangelogReleases, getLatestChangelogRelease } from "@/src/lib/changelog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Changelog | Habitrades",
  description: "Daily product updates from Habitrades — what we ship, day by day.",
};

export default async function ChangelogPage() {
  const [releases, latestRelease] = await Promise.all([
    getAllChangelogReleases(),
    getLatestChangelogRelease(),
  ]);

  if (!latestRelease) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="overflow-clip px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 min-[900px]:px-10 min-[1200px]:pb-24">
        <ChangelogView releases={releases} activeRelease={latestRelease} />
      </main>
      <Footer />
    </>
  );
}