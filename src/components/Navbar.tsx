"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { navItems } from "@/src/data/site-content";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const menuItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] bg-[#0a0908] px-4 sm:px-6 min-[810px]:px-10">
      <nav className="mx-auto flex h-16 max-w-[1080px] items-center justify-between px-0 text-white">
        <a
          href="#"
          aria-label="Habi home"
          className="relative block h-8 w-[88px] shrink-0"
        >
          <Image
            src="/images/Habi white.svg"
            alt="Habi"
            fill
            sizes="88px"
            className="object-contain"
            priority
          />
        </a>

        <div className="hidden items-center gap-2 text-base text-[#dedede] lg:flex xl:gap-4 pl-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#pricing"
          className="hidden rounded-lg bg-white px-2 py-2 leading-none text-base font-medium text-black transition-transform hover:scale-[1.03] lg:block"
        >
          Get Started
        </a>

        {/* Mobile Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid size-9 place-items-center rounded-lg lg:hidden"
        >
          <div className="relative h-4 w-5">
            <motion.span
              animate={{
                rotate: open ? 45 : 0,
                y: open ? 6 : 0,
              }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-0 top-0 h-[2px] w-5 rounded-full bg-white"
            />

            <motion.span
              animate={{
                opacity: open ? 0 : 1,
              }}
              transition={{
                duration: 0.2,
              }}
              className="absolute left-0 top-[6px] h-[2px] w-5 rounded-full bg-white"
            />

            <motion.span
              animate={{
                rotate: open ? -45 : 0,
                y: open ? -6 : 0,
              }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-0 top-[12px] h-[2px] w-5 rounded-full bg-white"
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed
              inset-0
              top-16
              z-[9998]
              bg-[#0a0908]
              lg:hidden
            "
          >
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="
                flex
                h-[calc(100dvh-64px)]
                flex-col
                items-center
                justify-center
                text-center
                px-6
              "
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  variants={menuItemVariants}
                  onClick={() => setOpen(false)}
                  className="
                    text-[34px]
                    font-medium
                    tracking-[-0.04em]
                    text-white
                  "
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.a
                variants={menuItemVariants}
                href="#pricing"
                onClick={() => setOpen(false)}
                className="
                  mt-8
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  px-6
                  text-base
                  font-medium
                  text-black
                "
              >
                Get Started
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
