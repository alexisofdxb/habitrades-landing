"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const adxFeatures = [
  {
    title: "Native utility",
    description: "Powers plans, credits and core Habitrades features",
    icon: "/images/premium-icon.svg",
  },
  {
    title: "Agent creation",
    description: "Create and activate trading agents",
    icon: "/images/reward-icon.svg",
  },
  {
    title: "Strategy marketplace",
    description: "Access, purchase and deploy strategies",
    icon: "/images/stack-icon.svg",
  },
  {
    title: "Vault operations",
    description: "Support vault creation and management",
    icon: "/images/unlocked-icon.svg",
  },
  {
    title: "Protocol buyback",
    description: "Platform fees contribute to HABI buybacks",
    icon: "/images/burning-icon.svg",
  },
  {
    title: "Token",
    description: "Fully unlocked, community-backed, no team allocation",
    icon: "/images/unlocked-icon.svg",
  },
  {
    title: "DAO",
    description: "Use the token to govern the protocol",
    icon: "/images/dao-icon.svg",
  },
] as const;

export default function ADXHeartbeat() {
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
    <section className="px-4 py-24 sm:px-6 sm:py-32 min-[1200px]:py-36">
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition}
          className="max-w-[620px]"
          style={{ willChange: "transform, opacity, filter" }}
        >
          <p className="text-sm leading-[1.3] text-[#858585]">
            <span className="text-white/35">{`// `}</span>
            Economy
          </p>
          <h2 className="mt-4 text-[28px] leading-[1.12] tracking-[-0.03em] sm:text-[32px] min-[1200px]:text-[36px]">
            <span className="block font-medium text-white">$HABI</span>
            <span className="block font-normal text-[#858585]">
              powering the next generation of agentic trading.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.08 }}
          className="relative mt-10 overflow-hidden rounded-[9px] bg-[#171615] min-[810px]:mt-12"
          style={{ willChange: "transform, opacity, filter" }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 73% 50%, rgba(255,255,255,0.17) 0%, rgba(255,255,255,0.11) 23%, rgba(255,255,255,0.045) 39%, rgba(0,0,0,0.18) 64%, transparent 82%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(23,22,21,0.98) 0%, rgba(23,22,21,0.78) 44%, rgba(23,22,21,0.22) 70%, rgba(23,22,21,0.42) 100%)",
            }}
          />
          <div className="relative grid min-h-[374px] gap-8 px-6 py-8 sm:px-10 min-[810px]:grid-cols-[0.92fr_1.08fr] min-[810px]:items-center min-[810px]:px-12 min-[810px]:py-10">
            <div className="relative z-10 max-w-[380px]">
              {adxFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`grid grid-cols-[22px_1fr] gap-4 py-4 ${
                    index === 0 ? "pt-0" : "border-t border-white/8"
                  }`}
                >
                  <span className="relative mt-1 block size-[22px] shrink-0">
                    <Image
                      src={feature.icon}
                      alt=""
                      fill
                      sizes="22px"
                      className="object-contain"
                    />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-medium leading-[1.25] tracking-[-0.02em] text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[11px] leading-[1.3] text-[#858585]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mx-auto flex h-[260px] w-full max-w-[430px] items-center justify-center min-[810px]:h-[330px] min-[1200px]:h-[360px]">
              <div className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/8 blur-3xl" />
              <div className="absolute bottom-[12%] left-1/2 h-[18%] w-[62%] -translate-x-1/2 rounded-full bg-black/60 blur-2xl" />
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.92 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative h-[220px] w-[220px] min-[810px]:h-[285px] min-[810px]:w-[285px] min-[1200px]:h-[310px] min-[1200px]:w-[310px]"
              >
                <Image
                  src="/images/gemini-coin.svg"
                  alt="$HABI token"
                  fill
                  sizes="(max-width: 809px) 220px, 310px"
                  className="scale-125 object-contain drop-shadow-[0_30px_22px_rgba(0,0,0,0.86)]"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
