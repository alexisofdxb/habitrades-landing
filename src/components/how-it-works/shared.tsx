"use client";

import { motion } from "framer-motion";
import { howItWorksSteps } from "@/src/data/site-content";

export type Step = (typeof howItWorksSteps)[number];
export type StepIconName = Step["icon"];

export const steps = howItWorksSteps;

export function StepIcon({
  name,
  size = 28,
}: {
  name: StepIconName;
  size?: number;
}) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 28 28",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "agent") {
    return (
      <svg {...props}>
        <path d="M10 8.5a4 4 0 1 1 8 0v1.5" />
        <path d="M7.5 22v-4.5a6.5 6.5 0 0 1 13 0V22" />
        <path d="M18.5 12.5h3.5l1.5 3-2 1.5" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg {...props}>
        <path d="M14 4.5 6.5 8v6.2c0 4.8 3.2 7.8 7.5 9.3 4.3-1.5 7.5-4.5 7.5-9.3V8L14 4.5Z" />
        <path d="M11 14.2 13 16.2l4.2-4.2" />
      </svg>
    );
  }

  if (name === "markets") {
    return (
      <svg {...props}>
        <circle cx="7" cy="14" r="3.2" />
        <circle cx="21" cy="8" r="3.2" />
        <circle cx="21" cy="20" r="3.2" />
        <path d="M10 12.4 17.8 9.4M10 15.6l7.8 3" />
      </svg>
    );
  }

  if (name === "strategy") {
    return (
      <svg {...props}>
        <path d="M6.5 21.5V10.5l5.5-4 5.5 4v11" />
        <path d="M11 14.5h6M11 18h6" />
        <path d="M19.5 8.5 22 6l1.5 3-3 1" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M6.5 21.5h15" />
      <path d="M8 17.5l3.5-6 3 4.5L18 9l2.5 4.5" />
      <path d="M19.5 7.5a2.2 2.2 0 1 1 0 .1" />
    </svg>
  );
}

export function SectionHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-[14px] leading-none tracking-[-0.02em] text-white/40">
        {"// How It Works"}
      </p>
      <h2 className="mt-5 text-[32px] leading-[1.2] tracking-[-0.03em] min-[1200px]:text-[36px] min-[1200px]:leading-[1.1]">
        <span className="block font-medium text-white">From setup to execution.</span>
        <span className="block font-normal text-white/40">Your agent learns along the way.</span>
      </h2>
    </div>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M3 8h10M9 4.5 12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}