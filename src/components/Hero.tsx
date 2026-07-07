"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const desktopLines = ["AI agents that trade,", "learn, and grow with you."];
const mobileLines = ["AI agents that trade,", "learn, and grow with you."];
const lines = [
  ["AI", "agents", "that", "trade,"],
  ["learn,", "and", "grow", "with", "you."],
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-12 sm:px-6 sm:pt-40 sm:pb-14 lg:pt-40 lg:pb-16">
      {/* <div className="hero-glow absolute inset-x-0 top-0 -z-10 h-[760px]" /> */}
      <div className="mx-auto max-w-[1080px] text-center">
        <div className="mx-auto hidden max-w-3xl min-[810px]:block">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.045,
                },
              },
            }}
            className="text-[56px] leading-[1.05] tracking-[-0.07em] text-white"
          >
            {lines.map((line, lineIndex) => (
              <div key={lineIndex} className="whitespace-nowrap">
                {line.map((word, index) => (
                  <motion.span
                    key={word}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 24,
                        filter: "blur(8px)",
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: {
                          duration: 0.65,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                    style={{
                      display: "inline-block",
                      marginRight: "0.28em",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            ))}
          </motion.h1>
        </div>
        <div className="mx-auto max-w-sm min-[810px]:hidden">
          {mobileLines.map((line, index) => (
            <motion.h1
              key={line}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1 + index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[36px] px-4 leading-[1.2] tracking-[-0.03em] text-white min-[390px]:text-[40px] min-[390px]:leading-[48px]"
            >
              {line}
            </motion.h1>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mx-auto mt-4 sm:max-w-[40%] px-1 text-base leading-[1.4] text-white/50"
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
