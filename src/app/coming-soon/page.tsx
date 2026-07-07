import type { Metadata } from "next";
import ComingSoon from "@/src/components/ComingSoon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Habitrades — Launching Soon",
  description:
    "Habitrades is launching soon. Agentic trading with habits, risk controls, and multi-market execution.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComingSoonPage() {
  return <ComingSoon />;
}