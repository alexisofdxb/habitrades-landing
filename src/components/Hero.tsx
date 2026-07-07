"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const rotatingWords = ["Trade", "Learn", "Grow"] as const;
const ROTATE_MS = 2800;

const revealEase = [0.16, 1, 0.3, 1] as const;

function HeroRotatingWord({
  className,
  pillClassName,
}: {
  className?: string;
  pillClassName?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const id = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [shouldReduceMotion]);

  const word = rotatingWords[wordIndex];

  return (
    <span
      className={`relative inline-grid overflow-hidden align-middle ${className ?? ""}`}
      aria-live="polite"
    >
      <span className="invisible col-start-1 row-start-1 px-4" aria-hidden>
        Learn
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, x: -24 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className={`col-start-1 row-start-1 inline-flex items-center justify-center rounded-xl bg-[#b7ff4a] px-4 text-[#080808] ${pillClassName ?? ""}`}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function HeroHeadline({
  sizeClass,
  pillClassName,
  animateWords,
}: {
  sizeClass: string;
  pillClassName: string;
  animateWords: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const prefixWords = ["AI", "agents", "that"];
  const suffixWords = ["with", "you."];

  const wordMotion = animateWords
    ? {
        hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.65, ease: revealEase },
        },
      }
    : undefined;

  return (
    <h1 className={sizeClass}>
      <div>
        {prefixWords.map((word) => (
          <motion.span
            key={word}
            initial={animateWords ? "hidden" : false}
            animate={animateWords ? "visible" : undefined}
            variants={wordMotion}
            style={{ display: "inline-block", marginRight: "0.28em" }}
          >
            {word}
          </motion.span>
        ))}
        <motion.span
          initial={animateWords ? "hidden" : false}
          animate={animateWords ? "visible" : undefined}
          variants={wordMotion}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          <HeroRotatingWord pillClassName={pillClassName} />
        </motion.span>
      </div>
      <div className={shouldReduceMotion ? "" : "mt-[0.06em]"}>
        {suffixWords.map((word) => (
          <motion.span
            key={word}
            initial={animateWords ? "hidden" : false}
            animate={animateWords ? "visible" : undefined}
            variants={wordMotion}
            style={{ display: "inline-block", marginRight: "0.28em" }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </h1>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-12 sm:px-6 sm:pt-40 sm:pb-14 lg:pt-40 lg:pb-16">
      <div className="mx-auto max-w-[1080px] text-center">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.045 } },
          }}
          className="mx-auto hidden max-w-3xl min-[810px]:block"
        >
          <HeroHeadline
            sizeClass="text-[56px] leading-[1.05] tracking-[-0.07em] text-white"
            pillClassName="text-[56px] leading-[1.05] tracking-[-0.07em] font-medium"
            animateWords
          />
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-sm min-[810px]:hidden"
        >
          <HeroHeadline
            sizeClass="px-4 text-[36px] leading-[1.2] tracking-[-0.03em] text-white min-[390px]:text-[40px] min-[390px]:leading-[48px]"
            pillClassName="text-[36px] leading-[1.2] tracking-[-0.03em] font-medium min-[390px]:text-[40px] min-[390px]:leading-[48px]"
            animateWords={false}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mx-auto mt-4 px-1 text-base leading-[1.4] text-white/50 sm:max-w-[40%]"
        >
          From market monitoring to risk-managed execution, your agent builds
          memory and improves through every trade.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.6 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="https://app.tryhabi.xyz"
            className="inline-flex rounded-lg bg-white px-3 py-3 text-base leading-none font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Create Your Agent
          </a>
          <a
            href="https://app.tryhabi.xyz/beta/onboard"
            className="inline-flex rounded-lg border border-[#171615] px-3 py-3 text-base leading-none font-medium text-white outline-none transition-transform hover:scale-[1.03] hover:border-[#2a2928]"
          >
            Join Waitlist
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.75, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 sm:mt-18"
        >
          <div className="relative overflow-hidden rounded-xl p-1.5 shadow-[0_60px_160px_rgba(0,0,0,0.75)] sm:rounded-2xl sm:p-0">
            <div className="relative aspect-[1.8/1] overflow-hidden rounded-lg sm:rounded-xl min-[810px]:aspect-[1.78/1]">
              <Image
                src="/web/hero.svg"
                alt="Habitrades agent chat across Hyperliquid and Polymarket"
                fill
                priority
                unoptimized
                sizes="(max-width: 1200px) 94vw, 1080px"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}