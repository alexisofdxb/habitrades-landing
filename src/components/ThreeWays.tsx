"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const ways = [
  {
    title: "Command line",
    description:
      "Install via npm and start coding instantly from your terminal.",
    action: "npm install -g exact",
    image: "/images/three-ways-command.jpg",
    variant: "terminal",
  },
  {
    title: "Desktop app",
    description:
      "Native macOS, Windows, and Linux app with full offline support.",
    action: "Download for macOS",
    image: "/images/three-ways-desktop.jpg",
    variant: "desktop",
  },
  {
    title: "Browser",
    description:
      "Try Exact instantly in your browser. No installation required.",
    action: "Open in browser",
    image: "/images/three-ways-browser.jpg",
    variant: "browser",
  },
] as const;

function ClipboardIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.5 4.5h5" />
      <path d="M6 3h6l1 1.5V15H5V4.5L6 3Z" />
      <path d="M7 7.5h4M7 10.5h4" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 3.5v10" />
      <path d="m6.8 9.8 4.2 4.2 4.2-4.2" />
      <path d="M4 16.5v2h14v-2" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 5H5v10h10v-3" />
      <path d="M11 5h4v4" />
      <path d="m9 11 6-6" />
    </svg>
  );
}

function WayVisual({ image, title }: Pick<(typeof ways)[number], "image" | "title">) {
  return (
    <div className="relative aspect-[1.1/1] overflow-hidden rounded-lg bg-[#151515] sm:aspect-[1.08/1]">
      <Image
        src={image}
        alt={`${title} Exact interface`}
        fill
        sizes="(max-width: 767px) calc(100vw - 32px), 360px"
        className="object-cover"
      />
    </div>
  );
}

export default function ThreeWays() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : { opacity: 0, y: 34, filter: "blur(8px)" };
  const animate = { opacity: 1, y: 0, filter: "blur(0px)" };
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 min-[1200px]:py-24">
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition}
        >
          <p className="text-sm leading-[1.3] text-[#858585]">
            <span className="text-white/35">{`// `}</span>
            Three ways to code
          </p>
          <h2 className="mt-4 text-[32px] font-normal leading-[1.12] tracking-[-0.03em] min-[810px]:text-[36px] min-[1200px]:text-[36px]">
            Start coding your way.
            <span className="text-[#858585]"> Choose what works best.</span>
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-10 min-[760px]:mt-14 min-[760px]:grid-cols-3 min-[760px]:gap-4 min-[1000px]:gap-6">
          {ways.map((way, index) => (
            <motion.article
              key={way.title}
              initial={initial}
              whileInView={animate}
              viewport={{ once: true, margin: "-70px" }}
              transition={{
                ...transition,
                delay: shouldReduceMotion ? 0 : index * 0.08,
              }}
              style={{ willChange: "transform, opacity, filter" }}
            >
              <WayVisual image={way.image} title={way.title} />
              <h3 className="mt-5 text-[20px] font-medium leading-none tracking-[-0.04em] min-[760px]:text-[20px] min-[1000px]:text-[20px]">
                {way.title}
              </h3>
              <p className="mt-2 max-w-[340px] text-[14px] leading-[1.25] tracking-[-0.02em] text-[#858585] min-[760px]:text-[14px] min-[1000px]:text-[14px]">
                {way.description}
              </p>
              <a
                href="#"
                className={`mt-5 inline-flex h-12 items-center gap-4 rounded-lg px-3 text-[14px] font-semibold tracking-[-0.02em] transition-transform hover:scale-[1.025] ${
                  way.variant === "terminal"
                    ? "bg-[#171615] text-white"
                    : "bg-white text-[#111]"
                }`}
              >
                <span>{way.action}</span>
                {way.variant === "terminal" && <ClipboardIcon />}
                {way.variant === "desktop" && <DownloadIcon />}
                {way.variant === "browser" && <ExternalIcon />}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
