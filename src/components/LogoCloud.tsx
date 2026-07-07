"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type PartnerId =
  | "privy"
  | "anylayer"
  | "anthropic"
  | "openai"
  | "google-cloud"
  | "vercel"
  | "polymarket"
  | "hyperliquid";

const companies: PartnerId[] = [
  "privy",
  "anylayer",
  "anthropic",
  "openai",
  "google-cloud",
  "vercel",
  "polymarket",
  "hyperliquid",
];

const partnerMeta: Record<
  PartnerId,
  {
    src: string;
    alt: string;
    width: number;
    height: number;
    whiteFilter?: boolean;
    imageClassName?: string;
  }
> = {
  privy: {
    src: "/images/partners/Privy_Brandmark_White.svg",
    alt: "Privy",
    width: 72,
    height: 18,
  },
  anylayer: {
    src: "/images/partners/anylayer-logo-text.svg",
    alt: "Anylayer",
    width: 138,
    height: 28,
    imageClassName: "h-7 w-auto max-w-[150px] object-contain sm:h-8",
  },
  anthropic: {
    src: "/images/partners/Anthropic_Logo_0.svg",
    alt: "Anthropic",
    width: 110,
    height: 18,
  },
  openai: {
    src: "/images/partners/OpenAI_Logo.svg.png",
    alt: "OpenAI",
    width: 88,
    height: 24,
    whiteFilter: true,
  },
  "google-cloud": {
    src: "/images/partners/Google-Cloud-Logo.png",
    alt: "Google Cloud",
    width: 280,
    height: 48,
    whiteFilter: true,
    imageClassName: "h-8 w-auto min-w-[150px] object-contain sm:h-9",
  },
  vercel: {
    src: "/images/partners/vercel.png",
    alt: "Vercel",
    width: 90,
    height: 20,
    whiteFilter: true,
  },
  polymarket: {
    src: "/images/partners/polymarket.svg",
    alt: "Polymarket",
    width: 160,
    height: 40,
    whiteFilter: true,
    imageClassName: "h-8 w-auto max-w-[175px] object-contain sm:h-9 sm:max-w-[190px]",
  },
  hyperliquid: {
    src: "/images/partners/hyperliquid.svg",
    alt: "Hyperliquid",
    width: 130,
    height: 22,
    imageClassName: "h-6 w-auto max-w-[140px] object-contain sm:h-7",
  },
};

function PartnerLogo({ id }: { id: PartnerId }) {
  const partner = partnerMeta[id];
  const defaultImageClass =
    "h-auto max-h-6 w-auto max-w-[130px] object-contain sm:max-h-7";
  const filterClass = partner.whiteFilter ? "brightness-0 invert" : "";

  return (
    <div className="flex min-h-8 items-center justify-center">
      <Image
        src={partner.src}
        alt={partner.alt}
        width={partner.width}
        height={partner.height}
        unoptimized
        className={`${partner.imageClassName ?? defaultImageClass} ${filterClass}`}
      />
    </div>
  );
}

export default function LogoCloud() {
  return (
    <section id="logos" className="flex px-4 py-20 sm:px-6 sm:py-28 min-[810px]:py-32">
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          <h2 className="text-xl font-normal leading-[1.2] tracking-[-0.02em]">
            Powered by industry-leading products
          </h2>
          <p className="mt-3 text-base leading-[1.3] text-[#858585]">
            Core infrastructure behind Habitrades
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-[900px] grid-cols-2 gap-y-10 min-[360px]:gap-x-4 sm:mt-14 sm:gap-x-8 sm:gap-y-14 min-[810px]:mt-16 min-[810px]:grid-cols-4 min-[810px]:gap-x-10 min-[810px]:gap-y-16">
          {companies.map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
            >
              <PartnerLogo id={company} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}