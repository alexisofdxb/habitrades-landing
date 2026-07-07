"use client";

import { motion } from "framer-motion";
import { Variant04ArcMobile } from "./how-it-works/ArcPath";
import { SectionHeader } from "./how-it-works/shared";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 min-[1200px]:py-36"
    >
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeader />
        </motion.div>

        <Variant04ArcMobile />
      </div>
    </section>
  );
}