"use client";

import { useState, type UIEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { coreFeatures, featureUseCase } from "@/src/data/site-content";

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const activeFeature = coreFeatures[activeIndex];

  function handleMobileSliderScroll(event: UIEvent<HTMLDivElement>) {
    const slider = event.currentTarget;
    const firstSlide = slider.querySelector<HTMLElement>("[data-feature-slide]");

    if (!firstSlide) {
      return;
    }

    const slideWidth = firstSlide.offsetWidth + 16;
    const nextIndex = Math.round(slider.scrollLeft / slideWidth);
    setMobileIndex(Math.min(coreFeatures.length - 1, Math.max(0, nextIndex)));
  }

  return (
    <section
      id="features"
      className="scroll-mt-24 px-4 pt-20 pb-12 sm:px-6 min-[810px]:px-10 min-[810px]:py-24 min-[1200px]:pb-28"
    >
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="max-w-[560px]"
        >
          <p className="hidden text-base leading-[1.3] text-[#858585] min-[640px]:block">
            <span className="text-white/35">{`// `}</span>
            Core Features
          </p>
          <h2 className="mt-0 text-[20px] font-normal leading-[1.1] tracking-[-0.04em] min-[640px]:mt-4 min-[640px]:text-[32px] min-[1200px]:text-[36px] min-[1200px]:leading-[1.1]">
            One tool. <span className="text-[#858585]">Every use case.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.08 }}
          role="tablist"
          aria-label="Core features"
          className="mt-10 hidden w-fit gap-1 rounded-xl bg-[#171615] p-1.5 min-[640px]:mt-14 min-[640px]:flex"
        >
          {coreFeatures.map((feature, index) => (
            <button
              key={feature.title}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`relative rounded-lg px-2 py-2 text-left text-sm font-medium transition-colors min-[640px]:min-w-[92px] min-[640px]:px-4 min-[640px]:text-center min-[810px]:text-sm ${
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
              <span className="relative z-10">{feature.title}</span>
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
            {coreFeatures.map((feature) => (
              <article
                key={feature.title}
                data-feature-slide
                className="w-full shrink-0 snap-start"
              >
                <div className="relative aspect-[1.42/1] overflow-hidden rounded-lg bg-[#111]">
                  <Image
                    src="/images/feature-wide.png"
                    alt=""
                    fill
                    sizes="calc(100vw - 32px)"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-[5%] bottom-[8%] top-[8%] overflow-hidden rounded-md">
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      fill
                      sizes="calc(100vw - 64px)"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[12px] leading-[1.3] text-[#858585]">
                    Debugging and refactoring
                  </p>
                  <p className="mt-4 max-w-[330px] text-[18px] font-normal leading-[1.08] tracking-[-0.035em] text-[#f4f4f2]">
                    Build frontend and backend seamlessly. Exact understands your
                    entire stack from React components to database queries.
                  </p>
                  <a
                    href={featureUseCase.href}
                    className="mt-5 inline-flex h-9 items-center rounded-md bg-white px-3 text-[12px] font-medium text-[#111] transition-transform hover:scale-[1.025]"
                  >
                    {featureUseCase.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-3 flex justify-center">
            <div className="flex h-6 items-center gap-1.5 rounded-full bg-white/20 px-2">
              {coreFeatures.map((feature, index) => (
                <span
                  key={feature.title}
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
          className="relative mt-4 hidden aspect-[1.05/1] overflow-hidden rounded-lg bg-[#111] min-[640px]:block sm:mt-6 min-[810px]:aspect-[1.784/1]"
        >
          <Image
            src="/images/feature-wide.png"
            alt=""
            fill
            sizes="(max-width: 1200px) calc(100vw - 32px), 1128px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/5" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.title}
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-[4%] bottom-[-1%] top-[0%] overflow-hidden rounded-md border border-white/10 sm:rounded-lg"
            >
              <Image
                src={activeFeature.image}
                alt={activeFeature.alt}
                fill
                sizes="(max-width: 1200px) 88vw, 980px"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mt-6 hidden items-start gap-8 min-[640px]:grid min-[810px]:grid-cols-[minmax(0,1fr)_auto] min-[810px]:items-end min-[810px]:gap-14"
        >
          <div className="min-w-0">
            <p className="text-base leading-[1.3] text-[#858585]">
              {featureUseCase.eyebrow}
            </p>
            <p className="mt-6 max-w-[910px] text-[20px] font-normal leading-[1.22] tracking-[-0.03em] text-[#f4f4f2] sm:text-[20px] min-[1200px]:text-[30px]">
              {featureUseCase.description}
            </p>
          </div>
          <a
            href={featureUseCase.href}
            className="inline-flex w-fit shrink-0 rounded-[10px] bg-white p-[7px] text-base font-medium text-[#111] transition-transform hover:scale-[1.025]"
          >
            {featureUseCase.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
