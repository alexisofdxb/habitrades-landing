type HabiBrandProps = {
  className?: string;
  compact?: boolean;
  brandName?: string;
};

export default function HabiBrand({
  className = "",
  compact = false,
  brandName,
}: HabiBrandProps) {
  return (
    <a
      href="#"
      aria-label="Habi home"
      className={`inline-flex items-center text-white ${compact ? "gap-2" : "gap-2.5"} ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 30 24"
        className={compact ? "h-5 w-[30px]" : "h-6 w-[22px]"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="1" width="28" height="22" rx="1.5" />
        <path d="m7 7 5 5-5 5" />
        <path d="M15 17h7" />
      </svg>
      <span
        className={
          compact
            ? "text-[18px] font-medium leading-none tracking-[-0.025em]"
            : "text-[24px] font-normal leading-none tracking-[-0.035em]"
        }
      >
        {brandName || "Habi"}
      </span>
    </a>
  );
}
