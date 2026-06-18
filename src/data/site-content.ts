export const navItems = [
  { label: "Why Habi", href: "#why-habi" },
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const coreFeatures = [
  {
    title: "Risks Engine",
    image: "/images/new-core-vault.png",
    alt: "Habi risk engine and trade controls",
  },
  {
    title: "Artifacts",
    image: "/images/new-core-risk.png",
    alt: "Habi market research artifact and funding analysis",
  },
  {
    title: "Vault",
    image: "/images/new-core-artifact.png",
    alt: "Habi vault management dashboard",
  },
  {
    title: "Strategies",
    image: "/images/new-core-strategy.png",
    alt: "Habi trading strategy workspace with agent reasoning and trade plan",
  },
];

export const featureUseCase = {
  eyebrow: "Full-stack development",
  description:
    "Build frontend and backend seamlessly. Exact understands your entire stack—from React components to database queries—and helps you ship faster with context-aware suggestions.",
  cta: "Start building",
  href: "#pricing",
};

export const benefits = [
  {
    title: "Receipt For Everything",
    description:
      "Configurable drawdown limits, max leverage, per-trade risk, and automated risk checks before execution.",
    icon: "receipt",
  },
  {
    title: "Execution Planning",
    description:
      "Complex multi-step trades are broken into ordered plans with reasoning before you approve.",
    icon: "steps",
  },
  {
    title: "Paper Mode For Safe Testing",
    description:
      "Test strategies and agent behavior without real capital before switching to live trading.",
    icon: "send",
  },
  {
    title: "Plain Language Strategies",
    description:
      "Describe your edge in one sentence; the agent translates it into executable parameters.",
    icon: "hash",
  },
  {
    title: "One chat, All venues",
    description:
      "Query positions, balances, and P&L across Hyperliquid and Polymarket from a single conversation.",
    icon: "chat",
  },
  {
    title: "Continuous Condition Monitoring",
    description:
      "Agents watch price thresholds, funding rates, and news for your alerts around the clock.",
    icon: "bell",
  },
] as const;

export const faqs = [
  {
    question: "What is Habi?",
    answer:
      "Habi is a privacy-focused agentic trading platform where users create their own AI trading agents, build strategies around their habits, and trade across markets like Hyperliquid and Polymarket with risk controls.",
  },
  {
    question: "What can I use my agent for?",
    answer:
      "You can use your agent to monitor markets, create trade intents, build portfolio baskets, track news, follow price movements, manage risk, and prepare or execute trades based on your permissions.",
  },
  {
    question: "Does the agent trade automatically?",
    answer:
      "Only if you allow it. You can run your agent in Paper mode, Approval mode, or Live mode. In Approval mode, your agent prepares trades and waits for your confirmation before anything is executed.",
  },
  {
    question: "What markets does Habi support?",
    answer:
      "Habi is built for price and probability markets, starting with Hyperliquid for trading perps and Polymarket for trading event outcomes.",
  },
  {
    question: "What are Vaults?",
    answer:
      "Vaults are agent-powered capital pools where users can participate in trading environments built around specific markets, goals, or risk profiles, with visible allocation, fees, performance, exposure, and risk status.",
  },
  {
    question: "Can I create different agents?",
    answer:
      "Yes. You can create multiple agents with different personalities, strategies, risk profiles, market focus, and execution settings.",
  },
  {
    question: "Can my agent build reputation?",
    answer:
      "Yes. Agents can build reputation through performance metrics, proof badges, live trading history, execution reliability, profitable periods, and no-liquidation records.",
  },
  {
    question: "Can I monetize my agent or strategy?",
    answer:
      "Yes. As agents build verified performance and reputation, users may be able to publish strategies, attract subscribers, participate in vaults, or monetize their edge through the platform.",
  },
];
