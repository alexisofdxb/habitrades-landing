"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { tradingOSCards } from "@/src/data/site-content";

function ShieldIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`size-[18px] ${active ? "text-[#b7ff4a]" : "text-current"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 20 7v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function HypeIcon({ active }: { active: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/hype.svg"
      alt=""
      aria-hidden
      width={18}
      height={18}
      className={`size-[18px] transition-opacity ${active ? "opacity-100" : "opacity-40"}`}
      draggable={false}
    />
  );
}

function ArtifactIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`size-[18px] ${active ? "text-[#b7ff4a]" : "text-current"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M10 13h4" />
      <path d="M10 17h4" />
    </svg>
  );
}

function ContextIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`size-[18px] ${active ? "text-[#b7ff4a]" : "text-current"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="m4.93 4.93 2.12 2.12" />
      <path d="m16.95 16.95 2.12 2.12" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      <path d="m4.93 19.07 2.12-2.12" />
      <path d="m16.95 7.05 2.12-2.12" />
    </svg>
  );
}

const icons = {
  shield: ShieldIcon,
  hype: HypeIcon,
  artifact: ArtifactIcon,
  context: ContextIcon,
} as const;

const rightPanelClass = "flex h-full flex-col rounded-[20px] bg-[#111010] p-3 sm:p-4";

function PhoneShowcase({ alt, src }: { alt: string; src: string }) {
  return (
    <div className="relative h-full min-h-[360px] overflow-hidden sm:min-h-[340px] min-[900px]:min-h-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/web/border.svg"
        alt=""
        aria-hidden
        width={426}
        height={413}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 overflow-hidden px-3 pt-4 sm:px-0 sm:pt-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={319}
          height={645}
          className="pointer-events-none absolute left-1/2 top-[10%] z-10 h-auto w-[min(248px,72vw)] max-w-none -translate-x-1/2 sm:top-[8%] sm:w-[278px] min-[900px]:top-[6%] min-[900px]:w-[310px]"
          draggable={false}
        />
      </div>
    </div>
  );
}

function StatCards({ activeIndex }: { activeIndex: number }) {
  const card = tradingOSCards[activeIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={card.title}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={rightPanelClass}
      >
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {card.stats.map((stat) => (
            <div
              key={stat.value}
              className="rounded-xl bg-[#171615] px-3 py-3 sm:px-4 sm:py-3.5"
            >
              <p className="text-[17px] font-medium leading-none tracking-[-0.03em] text-white sm:text-[18px]">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[11px] leading-[1.4] text-[#858585] sm:text-[12px]">
                {stat.label}
              </p>
              <p className="mt-1 text-[11px] text-[#b7ff4a] sm:text-[12px]">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-8 min-[640px]:mt-16 min-[640px]:flex-row min-[640px]:items-end min-[640px]:justify-between">
          <div className="min-w-0">
            <p className="text-[44px] font-medium leading-none tracking-[-0.04em] text-white sm:text-[52px] min-[1200px]:text-[60px]">
              {card.heroStat}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#858585] sm:text-[15px]">
              {card.heroStatLabel}
            </p>
          </div>

          <div className="w-full max-w-[300px] shrink-0 rounded-2xl border border-white/[0.1] bg-transparent px-5 py-4">
            <p className="text-[15px] font-medium tracking-[-0.02em] text-white">
              {card.title}
            </p>
            <p className="mt-2 text-[13px] leading-[1.5] text-[#858585]">
              {card.tagline}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function TradingOSFeatureGrid() {
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCard = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div id="platform" className="scroll-mt-24 text-left">
      <div className="overflow-x-auto border-b border-white/[0.08] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          aria-label="Trading OS capabilities"
          className="flex min-w-max min-[640px]:grid min-[640px]:min-w-0 min-[640px]:grid-cols-4"
        >
          {tradingOSCards.map((card, index) => {
            const Icon = icons[card.icon];
            const isActive = activeIndex === index;

            return (
              <button
                key={card.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectCard(index)}
                className={`relative flex shrink-0 items-center justify-center gap-2 px-4 py-5 transition-colors min-[640px]:shrink min-[640px]:px-4 min-[640px]:py-6 sm:gap-2.5 ${
                  isActive ? "text-white" : "text-white/40 hover:text-white/65"
                }`}
              >
                <Icon active={isActive} />
                <span className="whitespace-nowrap text-[13px] font-medium tracking-[-0.02em] sm:text-[14px]">
                  {card.title}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="platform-tab-underline"
                    className="absolute bottom-0 left-1/2 h-px w-[calc(100%-20px)] max-w-[148px] -translate-x-1/2 bg-[#b7ff4a]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 grid gap-8 min-[640px]:mt-10 min-[900px]:mt-12 min-[900px]:grid-cols-[0.82fr_1.18fr] min-[900px]:items-stretch min-[900px]:gap-8 min-[1200px]:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="h-full"
        >
          <PhoneShowcase
            alt={tradingOSCards[activeIndex].phoneAlt}
            src={tradingOSCards[activeIndex].phoneImage}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="h-full min-w-0"
        >
          <StatCards activeIndex={activeIndex} />
        </motion.div>
      </div>
    </div>
  );
}

export default function TradingOS() {
  return (
    <section className="scroll-mt-24 px-4 py-20 sm:px-6 min-[810px]:py-28">
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-[720px] text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#141312] px-4 py-1.5">
            <span className="grid size-5 place-items-center rounded-full border border-white/12 text-[11px] text-white/50">
              ?
            </span>
            <span className="text-[13px] font-medium tracking-[-0.01em] text-white/55">
              <span className="text-white/30">{`// `}</span>
              Platform
            </span>
          </div>
          <h2 className="mt-8 text-[32px] font-medium leading-[1.08] tracking-[-0.04em] text-white min-[810px]:text-[40px] min-[1200px]:text-[44px]">
            More than a trading platform.
            <span className="block font-normal text-white/45">
              An intelligent trading operating system.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-[540px] text-[15px] leading-[1.55] text-[#858585] min-[810px]:text-base">
            Traditional platforms help you place trades. Habitrades helps you
            think, plan, execute, and improve—with AI, risk controls, and full
            transparency on every decision.
          </p>
        </motion.div>

        <div className="mt-14 min-[900px]:mt-20">
          <TradingOSFeatureGrid />
        </div>
      </div>
    </section>
  );
}