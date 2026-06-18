"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { faqs } from "@/src/data/site-content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    <section
      id="faq"
      className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[760px] lg:py-[70px]"
    >
      <div className="mx-auto grid w-full max-w-[1080px] min-w-0 gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-14">
        <motion.div
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{ once: true, margin: "-80px" }}
          transition={revealTransition}
          className="min-w-0"
          style={{ willChange: "transform, opacity, filter" }}
        >
          <p className="text-[14px] leading-none tracking-[-0.02em] text-white/40">
            {"// FAQ"}
          </p>
          <h2 className="mt-5 text-[32px] font-normal leading-[1.2] tracking-[-0.03em] min-[1200px]:text-[36px] min-[1200px]:leading-[1.1]">
            Questions?{" "}
            <span className="text-white/40">We&apos;ve got answers.</span>
          </h2>
        </motion.div>
        <div className="flex min-w-0 flex-col gap-3 sm:gap-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <motion.div
                key={faq.question}
                initial={revealInitial}
                whileInView={revealAnimate}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  ...revealTransition,
                  delay: shouldReduceMotion ? 0 : index * 0.055,
                }}
                className="overflow-hidden rounded-[10px] bg-[#151414]"
                style={{ willChange: "transform, opacity, filter" }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="flex min-h-[60px] w-full cursor-pointer items-center justify-between gap-3 px-4 py-4 text-left text-[14px] font-semibold leading-tight text-[#f1f1ef] transition-colors hover:bg-white/[0.025] sm:min-h-[63px] sm:gap-5 sm:px-5 sm:text-[16px]"
                >
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className={`grid size-7 shrink-0 place-items-center text-[29px] font-light leading-none text-white/90 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                      id={answerId}
                    >
                      <p className="max-w-[540px] px-5 pb-5 text-[12px] leading-[1.55] text-white/50 sm:text-[14px]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
