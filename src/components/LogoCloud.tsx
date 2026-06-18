"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type LogoName =
  | "SignFlow"
  | "Anylayer"
  | "CloudSync"
  | "NotionKit"
  | "DataStream";

const companies: LogoName[] = [
  "SignFlow",
  "Anylayer",
  "NotionKit",
  "DataStream",
  "NotionKit",
  "DataStream",
  "SignFlow",
  "CloudSync",
];

const anylayerImage = "/images/anylayer-logo.svg";

function SignFlowMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="size-8 shrink-0"
      fill="currentColor"
    >
      <path d="M16 2a14 14 0 1 1-9.9 4.1L11 11a7 7 0 1 0 5-2V2Z" />
      <path d="M2 2h11v11H2Z" />
    </svg>
  );
}

function CloudSyncMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="size-8 shrink-0"
      fill="currentColor"
    >
      <circle cx="16" cy="16" r="14" />
      <path d="m18.3 7-8 10.2h5.1L13.7 25l8-10.2h-5.1L18.3 7Z" fill="#080808" />
    </svg>
  );
}

function AnylayerMark() {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center">
      <Image
        src={anylayerImage}
        alt=""
        width={32}
        height={32}
        unoptimized
        className="size-full scale-200 object-contain"
      />
    </div>
  );
}

function NotionKitMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 36 28"
      className="h-7 w-9 shrink-0"
      fill="currentColor"
    >
      <path d="M0 0h5l23 28h-5L0 0Z" />
      <path d="M9 0h5l22 27v1h-5L9 0Z" />
      <path d="M18 0h5l13 16v8L18 0Z" />
      <path d="M0 9 16 28H9L0 17V9Z" />
    </svg>
  );
}

function DataStreamMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="size-8 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
    >
      <circle cx="16" cy="16" r="5.2" fill="currentColor" stroke="none" />
      {Array.from({ length: 12 }).map((_, index) => (
        <path
          key={index}
          d="M16 1.5v6"
          transform={`rotate(${index * 30} 16 16)`}
        />
      ))}
    </svg>
  );
}

function CompanyLogo({ name }: { name: LogoName }) {
  return (
    <div className="flex min-w-0 items-center justify-center gap-2 whitespace-nowrap text-white sm:gap-2.5">
      {name === "SignFlow" && <SignFlowMark />}
      {name === "Anylayer" && <AnylayerMark />}
      {name === "CloudSync" && <CloudSyncMark />}
      {name === "DataStream" && <DataStreamMark />}
      <span
        className={`text-[15px] leading-none min-[390px]:text-base sm:text-lg ${
          name === "SignFlow"
            ? "font-semibold tracking-[-0.03em]"
            : name === "DataStream"
              ? "font-medium tracking-[-0.05em]"
              : "font-medium tracking-[-0.02em]"
        }`}
      >
        {name}
      </span>
      {name === "NotionKit" && <NotionKitMark />}
    </div>
  );
}

export default function LogoCloud() {
  return (
    <section id="logos" className="flex px-4 sm:px-6 py-12 min-[810px]:py-24">
      <div className="mx-auto w-full max-w-[1080px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          <h2 className="text-xl font-normal leading-[1.2] tracking-[-0.02em]">
            Trusted by developers at leading companies
          </h2>
          <p className="mt-3 text-base leading-[1.3] text-[#858585]">
            Used by developers at
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-[800px] grid-cols-2 gap-y-10 min-[360px]:grid-cols-2 min-[360px]:gap-x-4 sm:mt-14 sm:gap-x-8 sm:gap-y-14 min-[810px]:mt-16 min-[810px]:grid-cols-4 min-[810px]:gap-x-12 min-[810px]:gap-y-16">
          {companies.map((company, index) => (
            <motion.div
              key={`${company}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
            >
              <CompanyLogo name={company} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
