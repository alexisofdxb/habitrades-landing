import Image from "next/image";
import type { ReactNode } from "react";

const defaultBackground = "/images/hero-dashboard.png";

type ProductShowcaseFrameProps = {
  foregroundAlt: string;
  backgroundSrc?: string;
  foreground?: ReactNode;
  variant?: "image" | "code";
};

export function ProductShowcaseFrame({
  foregroundAlt,
  backgroundSrc = defaultBackground,
  foreground,
  variant = "image",
}: ProductShowcaseFrameProps) {
  if (variant === "code") {
    return (
      <div className="relative overflow-hidden rounded-xl bg-black shadow-[0_60px_160px_rgba(0,0,0,0.75)] sm:rounded-2xl">
        <div className="relative aspect-[2/1] min-h-0 overflow-y-auto min-[640px]:min-h-[320px] min-[810px]:min-h-[360px]">
          {foreground}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl p-1.5 shadow-[0_60px_160px_rgba(0,0,0,0.75)] sm:rounded-2xl sm:p-0">
      <div className="relative aspect-[1.8/1] overflow-hidden rounded-lg sm:aspect-[1.8/1] sm:rounded-xl min-[810px]:aspect-[1.78/1]">
        <Image
          src={backgroundSrc}
          alt=""
          fill
          sizes="(max-width: 1200px) 94vw, 1080px"
          className="object-cover"
        />
        <div className="absolute inset-x-[4%] bottom-[5%] top-[6%] overflow-hidden rounded-md border border-white/10 bg-black shadow-2xl sm:inset-x-[6%] sm:bottom-[7%] sm:top-[8%] sm:rounded-lg [&>*]:relative [&>*]:h-full [&>*]:w-full [&>*]:min-h-0">
          {foreground ?? (
            <Image
              src={backgroundSrc}
              alt={foregroundAlt}
              fill
              sizes="(max-width: 1200px) 82vw, 980px"
              className="object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}

type ProductShowcaseForegroundProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
};

export function ProductShowcaseForeground({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 1200px) 82vw, 980px",
}: ProductShowcaseForegroundProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      unoptimized={src.endsWith(".svg")}
      className="object-contain"
    />
  );
}