"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { benefits, benefitsFeaturedTitles } from "@/src/data/site-content";

const featuredBenefits = benefitsFeaturedTitles.map((title) => {
  const benefit = benefits.find((item) => item.title === title);
  if (!benefit) {
    throw new Error(`Missing featured benefit: ${title}`);
  }
  return benefit;
});

export default function Benefits() {
  const shouldReduceMotion = useReducedMotion();
  const revealInitial = shouldReduceMotion
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : { opacity: 0, y: 34, filter: "blur(8px)" };
  const revealAnimate = { opacity: 1, y: 0, filter: "blur(0px)" };
  const revealTransition = {
    duration: shouldReduceMotion ? 0 : 0.85,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section id="benefits" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 min-[810px]:py-36">
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{ once: true, margin: "-80px" }}
          transition={revealTransition}
          className="max-w-3xl"
          style={{ willChange: "transform, opacity, filter" }}
        >
          <p className="text-[14px] leading-none tracking-[-0.02em] text-white/40">
            {"// Benefits"}
          </p>
          <h2 className="mt-5 text-[32px] leading-[1.2] tracking-[-0.03em] min-[1200px]:text-[36px] min-[1200px]:leading-[1.1]">
            <span className="block font-medium text-white">Execute with proof.</span>
            <span className="block font-normal text-white/40">Trade with guardrails.</span>
          </h2>
        </motion.div>
        <div className="mt-10 grid grid-cols-4 gap-2 sm:mt-14 sm:gap-3 min-[1000px]:gap-3.5">
          {featuredBenefits.map((benefit, index) => {
            const isNaturalLayout =
              "imageLayout" in benefit && benefit.imageLayout === "natural";
            const imagePlacement =
              isNaturalLayout &&
              "imagePlacement" in benefit &&
              benefit.imagePlacement === "bottom"
                ? "bottom"
                : "top";

            const phoneWidth =
              isNaturalLayout && "imageWidth" in benefit ? benefit.imageWidth : 319;
            const phoneHeight =
              isNaturalLayout && "imageHeight" in benefit ? benefit.imageHeight : 645;
            const phoneScale =
              isNaturalLayout && "imageScale" in benefit ? benefit.imageScale : 0.86;

            const naturalImage = isNaturalLayout ? (
              <div
                className="relative w-full shrink-0 overflow-hidden"
                style={{ aspectRatio: "426 / 413" }}
              >
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
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={benefit.image}
                    alt={benefit.alt}
                    width={phoneWidth}
                    height={phoneHeight}
                    sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 250px"
                    unoptimized={benefit.image.endsWith(".svg")}
                    className="pointer-events-none absolute left-1/2 top-[6%] z-10 h-auto max-w-none -translate-x-1/2"
                    style={{
                      width: `${phoneScale * 78}%`,
                    }}
                  />
                </div>
              </div>
            ) : null;

            const naturalText = isNaturalLayout ? (
              <div
                className={
                  imagePlacement === "bottom"
                    ? "px-2.5 pt-3 min-[640px]:px-4 min-[640px]:pt-4 sm:px-5 sm:pt-5 min-[1000px]:px-3.5 min-[1000px]:pt-4"
                    : "px-2.5 min-[640px]:px-4 sm:px-5 min-[1000px]:px-3.5"
                }
              >
                <h3
                  className={`text-[12px] font-medium leading-[1.2] tracking-[-0.025em] min-[640px]:text-[14px] min-[1000px]:text-[15px] ${
                    imagePlacement === "top" ? "mt-3 sm:mt-8" : ""
                  }`}
                >
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[11px] leading-[1.35] text-white/45 min-[640px]:mt-2.5 min-[640px]:text-[12px] min-[1000px]:text-[13px]">
                  {benefit.description}
                </p>
              </div>
            ) : null;

            return (
            <motion.article
              key={benefit.title}
              initial={revealInitial}
              whileInView={revealAnimate}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                ...revealTransition,
                delay: shouldReduceMotion ? 0 : index * 0.055,
              }}
              className={`flex h-full min-w-0 flex-col rounded-[9px] bg-[#171615] transition-colors duration-300 hover:bg-[#191818] sm:min-h-[190px] ${
                isNaturalLayout
                  ? `overflow-hidden ${imagePlacement === "top" ? "pb-4 sm:pb-5 min-[1000px]:pb-4" : ""}`
                  : "p-2.5 min-[640px]:p-4 sm:p-5 min-[1000px]:p-3.5"
              }`}
              style={{ willChange: "transform, opacity, filter" }}
            >
              {isNaturalLayout ? (
                imagePlacement === "top" ? (
                  <>
                    {naturalImage}
                    {naturalText}
                  </>
                ) : (
                  <>
                    <div className="flex min-h-0 flex-1 flex-col">{naturalText}</div>
                    {naturalImage}
                  </>
                )
              ) : (
                <>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#080808]">
                    <Image
                      src={benefit.image}
                      alt={benefit.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 250px"
                      unoptimized={benefit.image.endsWith(".svg")}
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="mt-auto pt-3 text-[12px] font-medium leading-[1.2] tracking-[-0.025em] min-[640px]:pt-6 min-[640px]:text-[14px] min-[1000px]:pt-8 min-[1000px]:text-[15px]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-[1.35] text-white/45 min-[640px]:mt-2.5 min-[640px]:text-[12px] min-[1000px]:text-[13px]">
                    {benefit.description}
                  </p>
                </>
              )}
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}