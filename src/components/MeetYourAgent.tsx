"use client";

import { motion } from "framer-motion";
import { TradingOSFeatureGrid } from "@/src/components/TradingOS";

export default function MeetYourAgent() {
  return (
    <section
      id="meet-your-agent"
      className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 min-[810px]:py-36"
    >
      <div className="mx-auto w-full max-w-[1080px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-base leading-[1.3] text-[#858585]">
            <span className="text-white/35">{`// `}</span>
            Meet Your Trading Agent
          </p>
          <h2 className="mx-auto mt-4 max-w-[640px] text-[28px] font-medium leading-[1.12] tracking-[-0.03em] text-white min-[810px]:text-[32px] min-[1200px]:text-[36px]">
            Your personal AI trading desk
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-10 flex justify-center min-[810px]:mt-14"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] min-[1200px]:max-w-[360px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/web/hamburg.svg"
              alt="Habitrades mobile agent with memory, market context, and risk controls"
              width={319}
              height={645}
              className="mx-auto block h-auto w-full"
              draggable={false}
            />
            <div
              className="pointer-events-none absolute inset-x-[-4%] bottom-0 h-[54%] bg-gradient-to-t from-[#0a0908] from-20% via-[#0a0908]/88 to-transparent min-[810px]:h-[48%]"
              aria-hidden
            />
          </div>
          <p className="pointer-events-none absolute bottom-[4%] left-1/2 z-10 w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 px-4 text-center text-base leading-[1.45] text-[#858585] min-[810px]:bottom-[9%]">
            Everyone gets an intelligent agent with memory, market
            awareness, and customizable risk policies that evolve alongside your
            strategy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mx-auto mt-20 w-full max-w-[1080px] text-left min-[810px]:mt-24"
        >
          <TradingOSFeatureGrid />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-12 text-center min-[810px]:mt-16"
        >
          <a
            href="https://app.tryhabi.xyz"
            className="inline-flex rounded-lg bg-white px-4 py-3 text-base font-medium leading-none text-black transition-transform hover:scale-[1.03]"
          >
            Create Your Agent
          </a>
        </motion.div>
      </div>
    </section>
  );
}