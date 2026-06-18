"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function WhyHabi() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 0.45], [24, -18]);
  const terminalY = useTransform(scrollYProgress, [0, 0.55], [18, -18]);
  const chatY = useTransform(scrollYProgress, [0.2, 0.8], [38, -38]);

  return (
    <section
      ref={sectionRef}
      id="why-habi"
      className="relative  px-4 sm:px-6  "
    >
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div
          style={{ y: headingY }}
          className="mb-10 max-w-[430px] sm:mb-14"
        >
          <p className="text-base leading-none mb-2.5 tracking-[-0.02em] text-white/40">
            {"// Why Habi?"}
          </p>
          <h2 className="text-[29px] font-normal leading-[1.2] tracking-[-0.03em] min-[1200px]:text-[36px] min-[1200px]:leading-[1.1]">
            Your strategy,
            <br /> automated.
            <br />
            <span className="text-white/40">Your edge, protected.</span>
          </h2>
        </motion.div>

        <div className="space-y-6 min-[810px]:space-y-16">
          <article className="relative flex flex-col overflow-hidden rounded-xl bg-[#171615] p-2.5 sm:p-4 min-[810px]:sticky min-[810px]:top-24 min-[810px]:grid min-[810px]:min-h-[486px] min-[810px]:grid-cols-[1.22fr_0.98fr] min-[810px]:items-stretch">
            <div className="relative aspect-[1.05/1] overflow-hidden rounded-lg w-full sm:aspect-[1.35/1] min-[810px]:aspect-auto min-[810px]:min-h-0">
              <Image
                src="/images/private-agent.png"
                alt=""
                fill
                sizes="(max-width: 809px) calc(100vw - 64px), 610px"
                className="object-cover"
              />
              <motion.div
                // style={{ y: terminalY }}
                className="absolute bottom-[7%] left-0 right-[5.5%] top-[-8] overflow-hidden bg-black shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
              >
                <Image
                  src="/images/automation.png"
                  alt="Habi across Hyperliquid and Polymarket"
                  fill
                  sizes="(max-width: 809px) calc(100vw - 80px), 580px"
                  className="object-cover object-bottom-right"
                />
              </motion.div>
            </div>
            <div className="flex flex-col items-start justify-center px-3 py-8 sm:px-10 sm:py-10 min-[810px]:px-10 min-[1200px]:px-12">
              <h3 className="text-xl font-normal leading-[1.2] tracking-[-0.02em]">
                Your agent. Two markets. Infinite setups.
              </h3>
              <p className="mt-4 max-w-[350px] text-base leading-[1.3] text-white/45">
                From Hyperliquid perps to Polymarket events, Habi lets your
                agent scan price action, monitor probabilities, build trade
                plans, and execute only within your rules.
              </p>
              <a
                href="#pricing"
                className="mt-6 rounded-lg bg-white px-4 py-3 text-base font-medium leading-none text-[#111] transition-transform hover:scale-[1.025]"
              >
                Try Habi
              </a>
            </div>
          </article>

          <article className="relative flex flex-col-reverse sm:flex-col gap-2.5 overflow-hidden rounded-xl bg-[#171615] p-2.5 sm:gap-4 min-[810px]:sticky min-[810px]:top-24 min-[810px]:grid min-[810px]:grid-cols-[2fr_3fr] min-[810px]:items-center min-[810px]:p-3 min-[1200px]:p-4">
            <div className="flex flex-col items-start justify-center px-4 py-8 min-[810px]:px-8">
              <h3 className="text-xl font-normal leading-[1.2] tracking-[-0.02em]">
                Private by default. Powerful by design.
              </h3>
              <p className="mt-3 text-base leading-[1.3] text-white/45">
                Agents built to understand your trading habits without exposing
                your edge. Your strategies, prompts, risk rules, and execution
                history stay under your control, while your agent works
                privately across markets.
              </p>
              <a
                href="#pricing"
                className="mt-6 rounded-lg bg-white px-4 py-3 text-base font-medium text-[#0f0f0f]"
              >
                Create Your Agent
              </a>
            </div>
            <div className="relative aspect-[1.05/1] overflow-hidden rounded-lg sm:aspect-[1.327/1]">
              <Image
                src="/images/feature-vault.png"
                alt=""
                fill
                sizes="(max-width: 809px) 100vw, 60vw"
                className="object-cover"
              />
              <motion.div
                // style={{ y: chatY }}
                className="absolute inset-[8%] overflow-hidden rounded-lg shadow-2xl"
              >
                <Image
                  src="/images/feature-orbit.png"
                  alt="Private AI agent conversations"
                  fill
                  sizes="(max-width: 809px) 84vw, 45vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </article>

          <article className="relative flex flex-col gap-2.5 overflow-hidden rounded-xl bg-[#171615] p-2.5 sm:gap-4 min-[810px]:sticky min-[810px]:top-0 min-[810px]:grid min-[810px]:grid-cols-[3fr_2fr] min-[810px]:items-center min-[810px]:p-3 min-[1200px]:p-4">
            <div className="relative aspect-[1.05/1] overflow-hidden rounded-lg sm:aspect-[1.35/1] min-[810px]:aspect-auto min-[810px]:min-h-0">
              <Image
                src="/images/private-agent.png"
                alt=""
                fill
                sizes="(max-width: 809px) calc(100vw - 64px), 610px"
                className="object-cover"
              />
              <motion.div
                // style={{ y: terminalY }}
                className="absolute bottom-[7%] left-8 right-0 top-[-8] overflow-hidden bg-black shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
              >
                <Image
                  src="/images/feature-panel.png"
                  alt="24 hour market automation"
                  fill
                  sizes="(max-width: 809px) 100vw, 60vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
            <div className="flex flex-col items-start justify-center px-4 py-8 min-[810px]:px-8">
              <h3 className="text-xl font-normal leading-[1.2] tracking-[-0.02em]">
                24/7 market automation
              </h3>
              <p className="mt-3 text-base leading-[1.3] text-white/45">
                Create an agent that watches the market for you. Set the rules
                once, and your agent can monitor triggers, build trade plans,
                and act within your permissions even when you are offline.
              </p>
              <a
                href="#features"
                className="mt-6 rounded-lg bg-white px-4 py-3 text-base font-medium text-[#0f0f0f]"
              >
                Explore terminal
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
