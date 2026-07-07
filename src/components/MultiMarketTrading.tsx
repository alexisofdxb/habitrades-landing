"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { tradingMarketTypes } from "@/src/data/site-content";

const ACCENT_GLOWS = {
  lime: "rgba(183,255,74,0.18)",
  sky: "rgba(56,189,248,0.16)",
  amber: "rgba(251,191,36,0.16)",
  violet: "rgba(167,139,250,0.16)",
  emerald: "rgba(52,211,153,0.16)",
  cyan: "rgba(34,211,238,0.16)",
  rose: "rgba(251,113,133,0.16)",
  orange: "rgba(251,146,60,0.16)",
} as const;

const ACCENT_DOTS = {
  lime: "bg-[#b7ff4a]",
  sky: "bg-sky-400",
  amber: "bg-amber-400",
  violet: "bg-violet-400",
  emerald: "bg-emerald-400",
  cyan: "bg-cyan-400",
  rose: "bg-rose-400",
  orange: "bg-orange-400",
} as const;

type MarketIcon = (typeof tradingMarketTypes)[number]["icons"][number];

function MarketIconOrb({
  icon,
  index,
  total,
}: {
  icon: MarketIcon;
  index: number;
  total: number;
}) {
  const offset = index * 22 - (total - 1) * 11;

  return (
    <div
      className="absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#0a0908] shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.08] sm:size-12"
      style={{
        left: `calc(50% + ${offset}px - 22px)`,
        zIndex: total - index,
      }}
    >
      <span
        className="inline-flex size-6 items-center justify-center sm:size-7"
        style={{ transform: `scale(${icon.scale})` }}
      >
        <Image
          src={icon.src}
          alt=""
          width={28}
          height={28}
          className="h-full w-full object-contain"
        />
      </span>
    </div>
  );
}

export default function MultiMarketTrading() {
  const shouldReduceMotion = useReducedMotion();
  const revealInitial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 24 };
  const revealAnimate = { opacity: 1, y: 0 };
  const revealTransition = {
    duration: shouldReduceMotion ? 0 : 0.65,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section
      id="multi-market-trading"
      className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 min-[810px]:py-36"
    >
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{ once: true, margin: "-80px" }}
          transition={revealTransition}
          className="flex flex-col gap-6 min-[900px]:flex-row min-[900px]:items-start min-[900px]:justify-between min-[900px]:gap-12"
        >
          <div className="min-w-0 max-w-[520px]">
            <p className="text-[14px] leading-none tracking-[-0.02em] text-white/40">
              {"// Multi-Market Trading"}
            </p>
            <h2 className="mt-5 text-[32px] font-medium leading-[1.08] tracking-[-0.04em] text-white min-[810px]:text-[40px] min-[1200px]:text-[44px]">
              One Portfolio. Every Market.
            </h2>
          </div>
          <p className="max-w-[360px] text-[14px] leading-[1.6] text-[#858585] min-[900px]:pt-8 min-[900px]:text-right sm:text-[15px]">
            Trade and manage exposure across multiple trading venues without
            switching platforms.
          </p>
        </motion.div>

        <motion.div
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...revealTransition, delay: 0.06 }}
          className="mt-12 grid grid-cols-2 gap-3 sm:gap-3.5 min-[900px]:mt-16 min-[900px]:grid-cols-4"
        >
          {tradingMarketTypes.map((market, index) => (
            <motion.article
              key={market.label}
              initial={revealInitial}
              whileInView={revealAnimate}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                ...revealTransition,
                delay: 0.04 + index * 0.04,
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              className="group relative flex min-h-[168px] flex-col overflow-hidden rounded-[14px] bg-[#171615] p-4 transition-colors duration-300 hover:bg-[#1a1918] sm:min-h-[188px] sm:p-5"
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:size-32"
                style={{
                  background: `radial-gradient(circle, ${ACCENT_GLOWS[market.accent]} 0%, transparent 70%)`,
                  opacity: 0.75,
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04),transparent_65%)]"
                aria-hidden
              />

              <div className="relative mx-auto h-[72px] w-full sm:h-[80px]">
                {market.icons.map((icon, iconIndex) => (
                  <MarketIconOrb
                    key={icon.src}
                    icon={icon}
                    index={iconIndex}
                    total={market.icons.length}
                  />
                ))}
              </div>

              <div className="relative mt-auto pt-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${ACCENT_DOTS[market.accent]}`}
                    aria-hidden
                  />
                  <h3 className="text-[14px] font-medium tracking-[-0.02em] text-white sm:text-[15px]">
                    {market.label}
                  </h3>
                </div>
                <p className="mt-1.5 text-[12px] leading-[1.45] text-white/40 sm:text-[13px]">
                  {market.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}