"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const desktopLines = ["AI agents", "that trade the way you do."];
const mobileLines = ["AI agents", "that trade the way you do."];
const lines = [
  ["AI", "agents"],
  ["that", "trade", "the", "way", "you", "do."]
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-32 sm:px-6  sm:pt-40 lg:pt-40">
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
              <div key={lineIndex}>
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
          Privacy-focused trading agents that monitor markets, understand
          intent, manage risk, and execute trades.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.6 }}
          href="#why-habi"
          className="mt-7 inline-flex rounded-lg bg-white px-3 py-3 text-base leading-none font-medium text-black transition-transform hover:scale-[1.03]"
        >
          Create Your Agent
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.75, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 overflow-hidden rounded-xl p-1.5 shadow-[0_60px_160px_rgba(0,0,0,0.75)] sm:mt-18 sm:rounded-2xl sm:p-0"
        >
          <div className="relative aspect-[1.8/1] overflow-hidden rounded-lg sm:aspect-[1.8/1] sm:rounded-xl min-[810px]:aspect-[1.78/1]">
            <Image
              src="/images/hero-dashboard.png"
              alt="Golden landscape"
              fill
              priority
              sizes="(max-width: 1200px) 94vw, 1080px"
              className="object-cover"
            />
            <div className="absolute inset-x-[4%] bottom-[5%] top-[6%] overflow-hidden rounded-md border border-white/10 bg-black shadow-2xl sm:inset-x-[6%] sm:bottom-[7%] sm:top-[8%] sm:rounded-lg">
              <Image
                src="/images/hero-terminal.png"
                alt="Habi trading terminal"
                fill
                priority
                sizes="(max-width: 1200px) 82vw, 980px"
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
