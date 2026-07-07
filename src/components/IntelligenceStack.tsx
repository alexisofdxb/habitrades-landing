"use client";

import { motion, useReducedMotion } from "framer-motion";
import { intelligenceStackLayers } from "@/src/data/site-content";

export default function IntelligenceStack() {
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
      id="intelligence-stack"
      className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 min-[810px]:py-36"
    >
      <div className="mx-auto w-full max-w-[1080px]">
        <div className="min-[900px]:grid min-[900px]:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] min-[900px]:gap-16 min-[1200px]:gap-20">
          <motion.div
            initial={revealInitial}
            whileInView={revealAnimate}
            viewport={{ once: true, margin: "-80px" }}
            transition={revealTransition}
            className="min-[900px]:sticky min-[900px]:top-28 min-[900px]:self-start min-[1200px]:top-32"
          >
            <p className="text-[14px] leading-none tracking-[-0.02em] text-white/40">
              {"// The Habitrades Intelligence Stack"}
            </p>
            <h2 className="mt-5 text-[32px] font-medium leading-[1.08] tracking-[-0.04em] text-white min-[810px]:text-[40px] min-[1200px]:text-[44px]">
              Purpose-built infrastructure for intelligent trading
            </h2>
            <p className="mt-5 max-w-[340px] text-[14px] leading-[1.6] text-[#858585] sm:text-[15px]">
              Instead of generic AI, Habitrades combines multiple intelligence
              layers into one operating system.
            </p>
          </motion.div>

          <div className="mt-12 border-t border-white/[0.08] min-[900px]:mt-0">
            {intelligenceStackLayers.map((layer, index) => (
              <motion.article
                key={layer.title}
                initial={revealInitial}
                whileInView={revealAnimate}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  ...revealTransition,
                  delay: index * 0.04,
                }}
                className="border-b border-white/[0.08] py-10 sm:py-12 min-[900px]:py-14 min-[1200px]:py-16"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-xl font-medium tracking-[-0.03em] text-white sm:text-[22px]">
                      {layer.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.4] text-white/55 sm:text-[15px]">
                      {layer.subtitle}
                    </p>
                  </div>
                  <span className="shrink-0 border border-white/20 px-2.5 py-1 text-[13px] tabular-nums tracking-[0.02em] text-white/70">
                    [{index + 1}]
                  </span>
                </div>

                <p className="mt-6 text-[14px] leading-[1.6] text-[#858585] sm:text-[15px]">
                  {layer.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {layer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#171615] px-3 py-1.5 text-[12px] tracking-[-0.01em] text-white/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}