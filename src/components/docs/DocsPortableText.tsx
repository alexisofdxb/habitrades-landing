import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlForImage } from "@/src/lib/sanity.image";

type DocLinkValue = {
  page?: {
    slug?: string;
    title?: string;
  };
};

type CodeBlockValue = {
  language?: string;
  code?: string;
};

type CalloutValue = {
  tone?: "note" | "tip" | "warning";
  title?: string;
  body?: string;
};

const calloutToneClass: Record<NonNullable<CalloutValue["tone"]>, string> = {
  note: "bg-[#141312]",
  tip: "bg-[#b7ff4a]/5",
  warning: "bg-amber-400/5",
};

const calloutLabel: Record<NonNullable<CalloutValue["tone"]>, string> = {
  note: "Note",
  tip: "Tip",
  warning: "Warning",
};

function blockId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => {
      const text = value.children?.map((child) => child.text).join("") ?? "";
      const id = blockId(text);
      return (
        <h2
          id={id}
          className="scroll-mt-28 text-[24px] font-medium leading-[1.2] tracking-[-0.03em] text-white min-[810px]:text-[28px]"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const text = value.children?.map((child) => child.text).join("") ?? "";
      const id = blockId(text);
      return (
        <h3
          id={id}
          className="scroll-mt-28 text-[20px] font-medium leading-[1.25] tracking-[-0.03em] text-white"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="text-[17px] font-medium leading-[1.3] tracking-[-0.02em] text-white/90">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-[16px] leading-[1.65] text-white/62">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#b7ff4a]/40 pl-4 text-[16px] leading-[1.65] text-white/55">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-5 text-[16px] leading-[1.65] text-white/62 marker:text-white/25">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-5 text-[16px] leading-[1.65] text-white/62 marker:text-white/35">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-white/85">{children}</strong>,
    em: ({ children }) => <em className="text-white/72">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-[#1b1a19] px-1.5 py-0.5 font-mono text-[0.9em] text-[#b7ff4a]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-[#b7ff4a] underline decoration-[#b7ff4a]/30 underline-offset-2 transition-colors hover:text-white hover:decoration-white/30"
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
    docLink: ({ children, value }) => {
      const slug = (value as DocLinkValue | undefined)?.page?.slug;
      if (!slug) {
        return <span>{children}</span>;
      }

      return (
        <Link
          href={`/docs/${slug}`}
          className="text-[#b7ff4a] underline decoration-[#b7ff4a]/30 underline-offset-2 transition-colors hover:text-white hover:decoration-white/30"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) {
        return null;
      }

      const src = urlForImage(value as SanityImageSource).width(1200).url();
      const alt = typeof value.alt === "string" ? value.alt : "Documentation image";

      return (
        <figure className="my-8">
          <div className="overflow-hidden rounded-xl bg-[#111]">
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={675}
              className="h-auto w-full object-contain"
            />
          </div>
          {value.caption ? (
            <figcaption className="mt-2 text-center text-[13px] text-white/35">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    codeBlock: ({ value }) => {
      const block = value as CodeBlockValue;
      const language = block.language || "text";

      return (
        <div className="my-8 overflow-hidden rounded-xl bg-[#11100f]">
          <div className="bg-[#141312] px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white/35">
            {language}
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-[1.6] text-white/78">
            <code>{block.code}</code>
          </pre>
        </div>
      );
    },
    callout: ({ value }) => {
      const callout = value as CalloutValue;
      const tone = callout.tone ?? "note";

      return (
        <aside
          className={`my-8 rounded-xl px-4 py-3.5 ${calloutToneClass[tone]}`}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
            {callout.title || calloutLabel[tone]}
          </p>
          <p className="mt-2 text-[15px] leading-[1.55] text-white/68">{callout.body}</p>
        </aside>
      );
    },
  },
};

type DocsPortableTextProps = {
  value: PortableTextBlock[];
};

export default function DocsPortableText({ value }: DocsPortableTextProps) {
  return (
    <div className="docs-prose space-y-5">
      <PortableText value={value} components={components} />
    </div>
  );
}