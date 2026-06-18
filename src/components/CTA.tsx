"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section
      id="pricing"
      className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 min-[1200px]:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid w-full max-w-[1080px] overflow-hidden rounded-xl bg-[#121110] min-[810px]:grid-cols-[0.9fr_1.1fr] "
      >
        <div className="order-2 sm:-order-1 flex min-h-[300px] flex-col items-start justify-center px-6 py-10 sm:min-h-[340px] sm:px-12 sm:py-12 min-[810px]:min-h-[390px] min-[1200px]:px-14">
          <h2 className="max-w-[360px] text-[32px] font-normal leading-[1.2] tracking-[-0.03em] min-[1200px]:text-[36px] min-[1200px]:leading-[1.1]">
            Start coding with precision today
          </h2>
          <div className="mt-5 text-base leading-[1.3] text-[#858585]">
            <p>Free forever. Install in seconds.</p>
            <p className="mt-1">Start building immediately.</p>
          </div>
          <a
            href="#"
            className="mt-7 rounded-lg bg-white px-4 py-3 text-base font-medium text-[#0f0f0f] transition-transform hover:scale-[1.025]"
          >
            Download for macOS
          </a>
        </div>

        <div className="relative min-h-[300px] overflow-hidden p-3 pt-0 sm:min-h-[340px] sm:p-4 sm:pt-0 min-[810px]:min-h-[390px] min-[810px]:pl-0 min-[810px]:pt-4">
          <div className="relative h-full min-h-[280px] overflow-hidden rounded-lg sm:min-h-[308px]">
            <Image
              src="/images/feature-vault.png"
              alt=""
              fill
              sizes="(max-width: 809px) calc(100vw - 64px), 620px"
              className="object-cover"
            />
            <motion.div
              initial={{ opacity: 0, x: 35, scale: 1.03 }}
              whileInView={{ opacity: 1, x: 0, scale: 1.05 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.85,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-[5%] top-[10%] h-[92%] w-[108%] overflow-hidden rounded-lg border border-white/10 bg-black shadow-[0_28px_75px_rgba(0,0,0,0.65)] sm:left-[8%] sm:top-[13%]"
            >
              <Image
                src="/images/new-cta-market.png"
                alt="Habi market browser"
                fill
                sizes="(max-width: 809px) 120vw, 640px"
                className="object-cover object-left-top"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
