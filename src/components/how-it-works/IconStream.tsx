"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const MARKET_ICONS = [
  { src: "/images/market-icons/btc.svg", alt: "Bitcoin", scale: 1 },
  { src: "/images/market-icons/eth.svg", alt: "Ethereum", scale: 1 },
  { src: "/images/market-icons/link.svg", alt: "Chainlink", scale: 1 },
  { src: "/images/market-icons/usdc.svg", alt: "USD Coin", scale: 1 },
  { src: "/images/market-icons/avax.svg", alt: "Avalanche", scale: 1 },
  { src: "/images/market-icons/xrp.svg", alt: "XRP", scale: 1 },
  { src: "/images/market-icons/ada.svg", alt: "Cardano", scale: 1 },
  { src: "/images/market-icons/trx.svg", alt: "TRON", scale: 1 },
  { src: "/images/market-icons/apple.svg", alt: "Apple", scale: 1.75 },
  { src: "/images/market-icons/google.svg", alt: "Google", scale: 1.35 },
  { src: "/images/market-icons/meta.svg", alt: "Meta", scale: 1.55 },
  { src: "/images/market-icons/nvda.svg", alt: "NVIDIA", scale: 2.5 },
  { src: "/images/market-icons/oracle.svg", alt: "Oracle", scale: 1.65 },
  { src: "/images/market-icons/palantir.svg", alt: "Palantir", scale: 2.1 },
  { src: "/images/market-icons/tsla.svg", alt: "Tesla", scale: 1.8 },
  { src: "/images/market-icons/mastercard.svg", alt: "Mastercard", scale: 1.3 },
  { src: "/images/market-icons/starbucks.svg", alt: "Starbucks", scale: 1 },
] as const;

type MarketIcon = (typeof MARKET_ICONS)[number];

const LOOP_DURATION = 42;

function shuffleIcons<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildStream(icons: readonly MarketIcon[]) {
  const shuffled = shuffleIcons(icons);
  return [...shuffled, ...shuffled];
}

function StreamIcon({
  icon,
  size = "md",
}: {
  icon: MarketIcon;
  size?: "sm" | "md";
}) {
  const dimension = size === "sm" ? 22 : 24;
  const boxClass =
    size === "sm"
      ? "size-[22px]"
      : "size-6 min-[1200px]:size-7";
  const opacityClass =
    size === "sm" ? "opacity-45" : "opacity-60 min-[1200px]:opacity-65";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${boxClass}`}
      style={{ transform: `scale(${icon.scale})` }}
    >
      <Image
        src={icon.src}
        alt=""
        width={dimension}
        height={dimension}
        className={`h-full w-full object-contain ${opacityClass}`}
      />
    </span>
  );
}

export function IconStream() {
  const shouldReduceMotion = useReducedMotion();
  const [stream, setStream] = useState<MarketIcon[]>(() => [
    ...MARKET_ICONS,
    ...MARKET_ICONS,
  ]);

  useEffect(() => {
    setStream(buildStream(MARKET_ICONS));
  }, []);

  if (shouldReduceMotion) {
    return (
      <div className="flex items-center justify-center gap-5">
        {stream.slice(0, 5).map((icon) => (
          <StreamIcon key={icon.src} icon={icon} size="sm" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="flex w-max items-center gap-7"
      animate={{ x: ["0%", "-50%"] }}
      transition={{
        duration: LOOP_DURATION,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {stream.map((icon, index) => (
        <StreamIcon key={`${icon.src}-${index}`} icon={icon} />
      ))}
    </motion.div>
  );
}