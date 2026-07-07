import HabitradesLogo from "@/src/components/HabitradesLogo";

const productLinks = [
  { label: "Use cases", href: "/#use-cases" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

const resourceLinks = [
  { label: "Docs", href: "/docs/overview" },
  { label: "Blog", href: "/blog" },
  { label: "Changelog", href: "/changelog" },
];

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 4.5h3.4L19 19.5h-3.4L5 4.5Z" />
      <path d="m18.5 4.5-13 15" />
    </svg>
  );
}

const socialLinks = [
  { label: "X", href: "https://x.com/tryhabi", icon: <XIcon /> },
];

export default function Footer() {
  return (
    <footer className="bg-[#121110] px-4 py-20 sm:px-6 sm:py-24 min-[810px]:py-28">
      <div className="mx-auto grid w-full max-w-[1080px] gap-12 min-[810px]:grid-cols-[1fr_auto] min-[810px]:items-start min-[810px]:gap-16 min-[1200px]:gap-28">
        <div className="order-2 sm:-order-1 ">
          <a href="/" aria-label="Habitrades home" className="inline-flex shrink-0">
            <HabitradesLogo compact />
          </a>
          <p className="mt-5 max-w-[360px] text-sm leading-[1.3] text-[#858585]">
            Agentic trading built around your habits and risk.
            <br />
            Create agents, trade across markets, and execute with guardrails.
          </p>
          <div className="mt-4 sm:mt-7 flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="text-white/90 transition-colors text-xl hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 min-[390px]:gap-12 sm:gap-20 min-[1200px]:gap-24">
          <nav aria-label="Footer product navigation">
            <p className="text-sm font-medium text-white">Product</p>
            <div className="mt-6 space-y-3 sm:space-y-5">
              {productLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
          <nav aria-label="Footer resources navigation">
            <p className="text-sm font-medium text-white">Resources</p>
            <div className="mt-6 space-y-3 sm:space-y-5">
              {resourceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
