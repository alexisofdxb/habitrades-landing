"use client";

import { useState, type UIEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductShowcaseFrame } from "@/src/components/ProductShowcaseFrame";
import {
  InstitutionShowcase,
  isApiShowcase,
} from "@/src/components/InstitutionShowcase";
import {
  institutionFeatures,
  institutionsSection,
} from "@/src/data/site-content";

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const activeFeature = institutionFeatures[activeIndex];

  function handleMobileSliderScroll(event: UIEvent<HTMLDivElement>) {
    const slider = event.currentTarget;
    const firstSlide = slider.querySelector<HTMLElement>("[data-feature-slide]");

    if (!firstSlide) {
      return;
    }

    const slideWidth = firstSlide.offsetWidth + 16;
    const nextIndex = Math.round(slider.scrollLeft / slideWidth);
    setMobileIndex(
      Math.min(institutionFeatures.length - 1, Math.max(0, nextIndex)),
    );
  }

  return (
    <section
      id="use-cases"
      className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 min-[810px]:py-36"
    >
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="grid gap-8 min-[810px]:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] min-[810px]:items-end min-[810px]:gap-12 min-[1200px]:gap-16"
        >
          <div>
            <p className="text-[14px] leading-none tracking-[-0.02em] text-white/40">
              {"// Institutions"}
            </p>
            <h2 className="mt-5 text-[28px] leading-[1.1] tracking-[-0.04em] min-[640px]:text-[32px] min-[1200px]:text-[36px] min-[1200px]:leading-[1.1]">
              <span className="block font-medium text-white">Beyond trading.</span>
              <span className="block font-normal text-[#858585]">
                Built for institutions.
              </span>
            </h2>
          </div>
          <p className="max-w-[480px] text-[14px] leading-[1.6] text-[#858585] sm:text-[15px] min-[810px]:justify-self-end min-[810px]:pb-1">
            {institutionsSection.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.08 }}
          role="tablist"
          aria-label="Institution capabilities"
          className="mt-10 hidden w-full max-w-full gap-1 overflow-x-auto rounded-xl bg-[#171615] p-1.5 [scrollbar-width:none] min-[640px]:mt-14 min-[640px]:flex min-[640px]:w-fit [&::-webkit-scrollbar]:hidden"
        >
          {institutionFeatures.map((feature, index) => (
            <button
              key={feature.tabLabel}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`relative shrink-0 rounded-lg px-2 py-2 text-left text-sm font-medium transition-colors min-[640px]:px-3 min-[640px]:text-center min-[810px]:px-4 min-[810px]:text-sm ${
                activeIndex === index
                  ? "text-white"
                  : "text-white hover:text-white"
              }`}
            >
              {activeIndex === index && (
                <motion.span
                  layoutId="active-feature-tab"
                  className="absolute inset-0 rounded-lg bg-[#0a0a0a]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{feature.tabLabel}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-8 min-[640px]:hidden"
        >
          <div
            onScroll={handleMobileSliderScroll}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {institutionFeatures.map((feature) => (
              <article
                key={feature.tabLabel}
                data-feature-slide
                className="w-full shrink-0 snap-start"
              >
                <ProductShowcaseFrame
                  backgroundSrc="/images/feature-wide.png"
                  foregroundAlt={feature.alt}
                  variant={isApiShowcase(feature) ? "code" : "image"}
                  foreground={<InstitutionShowcase feature={feature} />}
                />

                <div className="mt-5">
                  <p className="text-[12px] leading-[1.3] text-[#858585]">
                    {feature.headline}
                  </p>
                  <p className="mt-4 max-w-[330px] text-[18px] font-normal leading-[1.08] tracking-[-0.035em] text-[#f4f4f2]">
                    {feature.description}
                  </p>
                  <a
                    href={institutionsSection.primaryCta.href}
                    className="mt-5 inline-flex h-9 items-center rounded-md bg-white px-3 text-[12px] font-medium text-[#111] transition-transform hover:scale-[1.025]"
                  >
                    {institutionsSection.primaryCta.label}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-3 flex justify-center">
            <div className="flex h-6 items-center gap-1.5 rounded-full bg-white/20 px-2">
              {institutionFeatures.map((feature, index) => (
                <span
                  key={feature.tabLabel}
                  className={`block size-2 rounded-full transition-colors ${
                    index === mobileIndex ? "bg-white" : "bg-white/45"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="relative mt-4 hidden min-[640px]:block sm:mt-6"
        >
          <ProductShowcaseFrame
            backgroundSrc="/images/feature-wide.png"
            foregroundAlt={activeFeature.alt}
            variant={isApiShowcase(activeFeature) ? "code" : "image"}
            foreground={
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.tabLabel}
                  initial={{ opacity: 0, y: 24, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full w-full"
                >
                  <InstitutionShowcase feature={activeFeature} />
                </motion.div>
              </AnimatePresence>
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mt-6 hidden items-start gap-8 min-[640px]:grid min-[810px]:grid-cols-[minmax(0,1fr)_auto] min-[810px]:items-end min-[810px]:gap-14"
        >
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.tabLabel}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-base leading-[1.3] text-[#858585]">
                  {activeFeature.headline}
                </p>
                <p className="mt-6 max-w-[910px] text-[20px] font-normal leading-[1.22] tracking-[-0.03em] text-[#f4f4f2] sm:text-[20px] min-[1200px]:text-[30px]">
                  {activeFeature.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <a
            href={institutionsSection.primaryCta.href}
            className="inline-flex w-fit shrink-0 rounded-[10px] bg-white p-[7px] text-base font-medium text-[#111] transition-transform hover:scale-[1.025]"
          >
            {institutionsSection.primaryCta.label}
          </a>
        </motion.div>
      </div>
    </section>
  );
}