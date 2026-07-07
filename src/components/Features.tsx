"use client";

import { useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ProductShowcaseFrame } from "@/src/components/ProductShowcaseFrame";
import { InstitutionShowcase } from "@/src/components/InstitutionShowcase";
import {
  institutionFeatures,
  institutionsSection,
} from "@/src/data/site-content";

function AccordionRow({
  feature,
  isActive,
  onSelect,
  shouldReduceMotion,
  accordionTransition,
}: {
  feature: (typeof institutionFeatures)[number];
  isActive: boolean;
  onSelect: () => void;
  shouldReduceMotion: boolean | null;
  accordionTransition: {
    height: { duration: number; ease: readonly [number, number, number, number] };
    opacity: { duration: number; ease: "easeOut" };
    layout: { duration: number; ease: readonly [number, number, number, number] };
  };
}) {
  return (
    <motion.div
      layout={!shouldReduceMotion}
      transition={accordionTransition}
      className="shrink-0 border-b border-white/[0.08]"
    >
      <button
        type="button"
        onClick={onSelect}
        aria-expanded={isActive}
        className="flex w-full cursor-pointer flex-col text-left"
      >
        <span
          className={`flex h-12 items-center text-[15px] font-medium tracking-[-0.02em] transition-colors duration-300 sm:h-[52px] sm:text-[16px] ${
            isActive ? "text-white" : "text-white/40"
          }`}
        >
          {feature.headline}
        </span>

        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              key="description"
              initial={
                shouldReduceMotion
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              animate={{ height: "auto", opacity: 1 }}
              exit={
                shouldReduceMotion
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={accordionTransition}
              className="overflow-hidden"
            >
              <p className="max-w-[420px] pt-1 pb-5 text-[13px] leading-[1.55] text-[#858585] sm:pt-1.5 sm:pb-6 sm:text-[14px]">
                {feature.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeFeature = institutionFeatures[activeIndex];
  const itemsBeforeActive = institutionFeatures.slice(0, activeIndex);
  const itemsAfterActive = institutionFeatures.slice(activeIndex + 1);

  const revealInitial = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 24 };
  const revealAnimate = { opacity: 1, y: 0 };
  const revealTransition = {
    duration: shouldReduceMotion ? 0 : 0.65,
    ease: [0.22, 1, 0.36, 1] as const,
  };
  const accordionTransition = {
    height: {
      duration: shouldReduceMotion ? 0 : 0.38,
      ease: [0.22, 1, 0.36, 1] as const,
    },
    opacity: {
      duration: shouldReduceMotion ? 0 : 0.22,
      ease: "easeOut" as const,
    },
    layout: {
      duration: shouldReduceMotion ? 0 : 0.38,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  return (
    <section
      id="use-cases"
      className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 min-[810px]:py-36"
    >
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{ once: true, margin: "-80px" }}
          transition={revealTransition}
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
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...revealTransition, delay: 0.08 }}
          className="mt-12 grid gap-8 min-[900px]:mt-16 min-[900px]:grid-cols-2 min-[900px]:items-stretch min-[900px]:gap-8 min-[1200px]:gap-10"
        >
          <LayoutGroup>
            <div className="order-2 flex h-full min-h-0 min-w-0 flex-col border-t border-white/[0.08] min-[900px]:order-1">
              {itemsBeforeActive.map((feature, index) => (
                <AccordionRow
                  key={feature.tabLabel}
                  feature={feature}
                  isActive={false}
                  onSelect={() => setActiveIndex(index)}
                  shouldReduceMotion={shouldReduceMotion}
                  accordionTransition={accordionTransition}
                />
              ))}

              <AccordionRow
                key={activeFeature.tabLabel}
                feature={activeFeature}
                isActive
                onSelect={() => setActiveIndex(activeIndex)}
                shouldReduceMotion={shouldReduceMotion}
                accordionTransition={accordionTransition}
              />

              {itemsAfterActive.length > 0 && (
                <>
                  <div
                    aria-hidden="true"
                    className="hidden min-h-0 min-[900px]:block min-[900px]:flex-1"
                  />
                  <div className="shrink-0">
                    {itemsAfterActive.map((feature, index) => (
                      <AccordionRow
                        key={feature.tabLabel}
                        feature={feature}
                        isActive={false}
                        onSelect={() => setActiveIndex(activeIndex + 1 + index)}
                        shouldReduceMotion={shouldReduceMotion}
                        accordionTransition={accordionTransition}
                      />
                    ))}
                  </div>
                </>
              )}

              {itemsAfterActive.length === 0 && (
                <div
                  aria-hidden="true"
                  className="hidden min-h-0 min-[900px]:block min-[900px]:flex-1"
                />
              )}
            </div>
          </LayoutGroup>

          <div className="order-1 flex h-full min-h-[380px] min-w-0 flex-col min-[900px]:order-2">
            <ProductShowcaseFrame
              foregroundAlt={activeFeature.alt}
              variant="code"
              fillHeight
              foreground={
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature.tabLabel}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full w-full"
                  >
                    <InstitutionShowcase feature={activeFeature} />
                  </motion.div>
                </AnimatePresence>
              }
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}