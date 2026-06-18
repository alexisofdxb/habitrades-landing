import Image from "next/image";

const navigationLinks = [
  { label: "Features", href: "#features" },
  { label: "Use cases", href: "#benefits" },
  { label: "Testimonials", href: "#why-habi" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
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

function DiscordIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 7.2a14 14 0 0 1 8 0l1.7 2.2a14 14 0 0 1 1.3 7.2 10.5 10.5 0 0 1-3.7 1.9l-.9-1.3a9 9 0 0 0 1.4-.7 9.7 9.7 0 0 1-7.6 0c.5.3.9.5 1.4.7l-.9 1.3A10.5 10.5 0 0 1 5 16.6a14 14 0 0 1 1.3-7.2L8 7.2Z" />
      <circle cx="9.3" cy="13" r=".8" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="13" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="1" />
      <path d="M8.25 10.5v6M11.25 16.5v-6" />
      <path d="M11.25 13.1a2.65 2.65 0 0 1 5.25.6v2.8" />
      <circle cx="8.25" cy="7.85" r=".85" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialLinks = [
  { label: "X", href: "https://www.twitter.com/", icon: <XIcon /> },
  {
    label: "Discord",
    href: "https://www.discord.com/",
    icon: <DiscordIcon />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: <LinkedInIcon />,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#121110] px-4 py-14 sm:px-6 sm:py-16 min-[810px]:py-20">
      <div className="mx-auto grid w-full max-w-[1080px] gap-12 min-[810px]:grid-cols-[1fr_auto] min-[810px]:items-start min-[810px]:gap-16 min-[1200px]:gap-28">
        <div className="order-2 sm:-order-1 ">
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
            />
          </a>
          <p className="mt-5 max-w-[360px] text-sm leading-[1.3] text-[#858585]">
            The AI code editor built for precision.
            <br />
            Write less, build more, ship faster.
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
          {[0, 1].map((column) => (
            <nav key={column} aria-label={`Footer navigation ${column + 1}`}>
              <p className="text-sm sm:text-sm font-medium text-white">
                Navigation
              </p>
              <div className="mt-6 space-y-3 sm:space-y-5">
                {navigationLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm sm:text-sm text-white/90 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}
