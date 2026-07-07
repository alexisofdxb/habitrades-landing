import Image from "next/image";

type HabitradesLogoProps = {
  className?: string;
  compact?: boolean;
};

export default function HabitradesLogo({
  className = "",
  compact = false,
}: HabitradesLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-white ${className}`}>
      <Image
        src="/images/habitrades-mark.svg"
        alt=""
        aria-hidden
        width={compact ? 20 : 22}
        height={compact ? 18 : 20}
        className="shrink-0"
        priority
      />
      <span
        className={
          compact
            ? "text-[16px] font-medium leading-none tracking-[-0.03em]"
            : "text-[17px] font-medium leading-none tracking-[-0.035em]"
        }
      >
        Habitrades
      </span>
    </span>
  );
}