"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const updateActiveIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-benefit-card]"),
    );
    if (cards.length === 0) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelectorAll<HTMLElement>("[data-benefit-card]")[index];
    card?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [shouldReduceMotion]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateActiveIndex();
    container.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      container.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [updateActiveIndex]);

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
        <div
          ref={scrollRef}
          className="-mx-4 mt-10 touch-pan-x overflow-x-auto overscroll-x-contain px-4 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory sm:mt-14 [&::-webkit-scrollbar]:hidden min-[1000px]:mx-0 min-[1000px]:overflow-visible min-[1000px]:px-0 min-[1000px]:snap-none"
        >
          <div className="flex w-max gap-3 min-[1000px]:grid min-[1000px]:w-full min-[1000px]:grid-cols-4 min-[1000px]:gap-3.5">
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
            const imageAnchor =
              isNaturalLayout &&
              "imageAnchor" in benefit &&
              benefit.imageAnchor === "bottom"
                ? "bottom"
                : "top";
            const imageVisibleRatio =
              isNaturalLayout && "imageVisibleRatio" in benefit
                ? benefit.imageVisibleRatio
                : 0.72;
            const clipAtTop = imagePlacement === "top";
            const phoneWidthPercent = phoneScale * 78;

            const naturalImage = isNaturalLayout ? (
              <div
                className={`relative w-full shrink-0 touch-none select-none overflow-hidden ${
                  imagePlacement === "bottom" ? "min-[1000px]:mt-auto" : ""
                }`}
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
                <div
                  className={`absolute inset-x-0 z-10 touch-none select-none overflow-hidden ${
                    clipAtTop ? "top-0" : "bottom-0"
                  }`}
                  style={{ height: `${imageVisibleRatio * 100}%` }}
                >
                  <Image
                    src={benefit.image}
                    alt={benefit.alt}
                    width={phoneWidth}
                    height={phoneHeight}
                    sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 250px"
                    unoptimized={benefit.image.endsWith(".svg")}
                    draggable={false}
                    className={`pointer-events-none absolute left-1/2 h-auto max-w-none -translate-x-1/2 touch-none select-none ${
                      imageAnchor === "bottom" ? "bottom-0" : "top-[6%]"
                    }`}
                    style={{
                      width: `${phoneWidthPercent}%`,
                      touchAction: "none",
                    }}
                  />
                </div>
              </div>
            ) : null;

            const naturalText = isNaturalLayout ? (
              <div
                className={
                  imagePlacement === "bottom"
                    ? "px-4 pt-4 pb-4 min-[640px]:px-4 min-[640px]:pt-4 sm:px-5 sm:pt-5 sm:pb-8 min-[1000px]:px-3.5 min-[1000px]:pt-4 min-[1000px]:pb-0"
                    : "px-4 min-[640px]:px-4 sm:px-5 min-[1000px]:px-3.5"
                }
              >
                <h3
                  className={`text-[16px] font-medium leading-[1.25] tracking-[-0.025em] min-[640px]:text-[14px] min-[1000px]:text-[15px] ${
                    imagePlacement === "top" ? "mt-4 sm:mt-8" : ""
                  }`}
                >
                  {benefit.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.45] text-white/45 min-[640px]:mt-2.5 min-[640px]:text-[12px] min-[1000px]:text-[13px]">
                  {benefit.description}
                </p>
              </div>
            ) : null;

            return (
            <motion.article
              key={benefit.title}
              data-benefit-card
              initial={revealInitial}
              whileInView={revealAnimate}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                ...revealTransition,
                delay: shouldReduceMotion ? 0 : index * 0.055,
              }}
              className={`flex h-full w-[calc(100vw-2rem)] shrink-0 snap-center flex-col rounded-[9px] bg-[#171615] transition-colors duration-300 hover:bg-[#191818] sm:min-h-[190px] min-[1000px]:w-auto min-[1000px]:min-w-0 min-[1000px]:shrink ${
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
                    {naturalText}
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

        <div
          className="mt-5 flex items-center justify-center gap-2 min-[1000px]:hidden"
          aria-label="Benefits carousel pagination"
        >
          {featuredBenefits.map((benefit, index) => (
            <button
              key={benefit.title}
              type="button"
              aria-label={`View ${benefit.title}`}
              aria-current={activeIndex === index}
              onClick={() => scrollToIndex(index)}
              className={`rounded-full transition-colors ${
                activeIndex === index
                  ? "size-2 bg-white"
                  : "size-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}