export const navItems = [
  { label: "Home", href: "/" },
  { label: "Learn", href: "/blog" },
  { label: "Documentation", href: "/docs/overview" },
  { label: "Changelog", href: "/changelog" },
];

export const tradingOSCards = [
  {
    title: "Unified Trading",
    tagline:
      "Trade perps, tokenised stocks, indices, IPOs, and forex from one interface—without switching tools or losing context.",
    heroStat: "up to 50x",
    heroStatLabel: "leverage on perps trading",
    icon: "hype" as const,
    phoneImage: "/web/unified.svg",
    phoneAlt: "Habitrades unified trading across multiple asset classes",
    stats: [
      { value: "Perps", label: "Perps, tokenised stocks, & IPOs", detail: "Live" },
      { value: "Events", label: "Prediction & macro markets", detail: "Live" },
      { value: "One chat", label: "Cross-venue position queries", detail: "Unified" },
      { value: "Live P&L", label: "Unified portfolio view", detail: "Real-time" },
    ],
  },
  {
    title: "Risk Engine",
    tagline:
      "Deterministic guardrails run before every execution—so out-of-policy trades stop before they hit the book.",
    heroStat: "100%",
    heroStatLabel: "pre-trade policy checks",
    icon: "shield" as const,
    phoneImage: "/web/risks.svg",
    phoneAlt: "Habitrades risk engine blocking trades outside guardrails",
    stats: [
      { value: "Drawdown", label: "Configurable loss limits", detail: "Enforced" },
      { value: "Leverage", label: "Hard caps per position", detail: "Capped" },
      { value: "Sizing", label: "Notional & exposure rules", detail: "Bounded" },
      { value: "Approval", label: "Route exceptions to you", detail: "On-demand" },
    ],
  },
  {
    title: "Artifacts",
    tagline:
      "Turn agent reasoning into trade objects you can review, share, and execute—compact in chat, full detail on open.",
    heroStat: "15+",
    heroStatLabel: "actionable artifact types",
    icon: "artifact" as const,
    phoneImage: "/web/artifact.svg",
    phoneAlt: "Habitrades trading artifacts including baskets and trade tickets",
    stats: [
      { value: "Tickets", label: "Single-trade action objects", detail: "Executable" },
      { value: "Baskets", label: "Multi-asset allocation plans", detail: "Allocations" },
      { value: "Plans", label: "Structured trade deliberation", detail: "Reviewable" },
      { value: "Signals", label: "Market triggers & alerts", detail: "Actionable" },
    ],
  },
  {
    title: "Context Engine",
    tagline:
      "Portfolio, market, and signal data fused into bounded context—so agents decide with the full picture, not raw noise.",
    heroStat: "Real-time",
    heroStatLabel: "bounded market context",
    icon: "context" as const,
    phoneImage: "/web/context.svg",
    phoneAlt: "Habitrades context engine assembling market and portfolio data",
    stats: [
      { value: "Market", label: "Prices, funding & sentiment", detail: "Fused" },
      { value: "Portfolio", label: "Positions, exposure & P&L", detail: "Unified" },
      { value: "Signals", label: "Fused event detection", detail: "Live" },
      { value: "Evidence", label: "Source-backed observations", detail: "Verified" },
    ],
  },
] as const;

export const everythingYouNeedTools = [
  {
    title: "AI Trading Chat",
    description:
      "Talk to your agent in plain language across markets, positions, and portfolios.",
    image: "/images/feature-orbit.png",
    alt: "Habitrades AI trading chat interface",
  },
  {
    title: "Plan Mode",
    description:
      "Review structured trade plans with reasoning before anything executes.",
    image: "/images/new-core-strategy.png",
    alt: "Habitrades plan mode with trade deliberation",
  },
  {
    title: "Portfolio Intelligence",
    description:
      "See positions, P&L, and exposure across venues in one unified view.",
    image: "/images/hero-dashboard.png",
    alt: "Habitrades portfolio intelligence dashboard",
  },
  {
    title: "Journal",
    description:
      "Replay every trade, signal, and decision with full context and receipts.",
    image: "/images/journal.svg",
    alt: "Habitrades trading journal",
  },
  {
    title: "Context Engine",
    description:
      "Portfolio, market, and signal data fused into bounded agent context.",
    image: "/images/context.svg",
    alt: "Habitrades context engine",
  },
  {
    title: "Automation",
    description:
      "Set triggers and let your agent monitor markets and act within your rules.",
    image: "/images/feature-panel.png",
    alt: "Habitrades market automation panel",
  },
  {
    title: "Market Scanner",
    description:
      "Scan Hyperliquid and Polymarket for setups that match your criteria.",
    image: "/images/new-cta-market.png",
    alt: "Habitrades market scanner",
  },
  {
    title: "Risk Engine",
    description:
      "Deterministic guardrails block trades outside your limits before execution.",
    image: "/images/new-core-risk.png",
    alt: "Habitrades risk engine",
  },
] as const;

export const intelligenceStackLayers = [
  {
    title: "Agent Runtime",
    subtitle: "Persistent identity for every trader.",
    description:
      "Long-running agents that remember your style, preferences, and history—so every session starts with context, not a blank slate.",
    tags: ["Memory", "Agent Identity", "Session Context", "Trader Profiles"],
  },
  {
    title: "Context Engine",
    subtitle: "Structured market state before every call.",
    description:
      "Fuses portfolio, signals, and market moves into bounded context so agents decide with the full picture—not raw feeds or fragmented tabs.",
    tags: ["Market Data", "Portfolio State", "Signal Fusion", "Bounded Context"],
  },
  {
    title: "Decision Engine",
    subtitle: "Explainable plans with confidence scoring.",
    description:
      "Turns intent into structured trade plans with reasoning, alternatives, and confidence—so you approve with clarity, not guesswork.",
    tags: ["Trade Plans", "Confidence Scores", "Reasoning Traces", "Approval Flow"],
  },
  {
    title: "Risk Engine",
    subtitle: "Deterministic policy before execution.",
    description:
      "Drawdown, leverage, and position limits enforced automatically. Anything outside your rules routes to approval—or stops.",
    tags: ["Guardrails", "Leverage Caps", "Drawdown Limits", "Policy Gates"],
  },
  {
    title: "HabiSmart",
    subtitle: "Optimize AI performance without managing multiple providers.",
    description:
      "HabiSmart intelligently routes requests across supported models based on complexity, quality requirements, speed, and cost, helping institutions balance performance with compute efficiency.",
    tags: ["Intelligent Routing", "Model Selection", "Cost Efficiency", "Performance Optimization"],
  },
  {
    title: "Reputation Engine",
    subtitle: "Trust built on verifiable history.",
    description:
      "Performance, execution reliability, and audit trails compound into reputation agents—and strategies—can prove over time.",
    tags: ["Track Record", "Proof Badges", "Audit Trail", "Performance History"],
  },
] as const;

export const tradingMarketTypes = [
  {
    label: "Perps",
    description: "Crypto perpetuals with unified margin.",
    accent: "lime" as const,
    icons: [
      { src: "/images/market-icons/btc.svg", alt: "Bitcoin", scale: 1.1 },
      { src: "/images/market-icons/eth.svg", alt: "Ethereum", scale: 1 },
    ],
  },
  {
    label: "Tokenised Stocks",
    description: "On-chain exposure to global equities.",
    accent: "sky" as const,
    icons: [
      { src: "/images/market-icons/apple.svg", alt: "Apple", scale: 1.6 },
      { src: "/images/market-icons/tsla.svg", alt: "Tesla", scale: 1.5 },
    ],
  },
  {
    label: "Commodities",
    description: "Trade real-world asset markets.",
    accent: "amber" as const,
    icons: [
      { src: "/images/market-icons/starbucks.svg", alt: "Starbucks", scale: 1 },
      { src: "/images/market-icons/usdc.svg", alt: "USD Coin", scale: 1 },
    ],
  },
  {
    label: "Prediction Markets",
    description: "Probability markets on real outcomes.",
    accent: "violet" as const,
    icons: [
      { src: "/images/market-icons/link.svg", alt: "Chainlink", scale: 1 },
      { src: "/images/market-icons/ada.svg", alt: "Cardano", scale: 1 },
    ],
  },
  {
    label: "Forex",
    description: "Major pairs and cross rates.",
    accent: "emerald" as const,
    icons: [
      { src: "/images/market-icons/usdc.svg", alt: "USD Coin", scale: 1 },
      { src: "/images/market-icons/mastercard.svg", alt: "Mastercard", scale: 1.2 },
    ],
  },
  {
    label: "Indices",
    description: "Broad market and sector benchmarks.",
    accent: "cyan" as const,
    icons: [
      { src: "/images/market-icons/nvda.svg", alt: "NVIDIA", scale: 2 },
      { src: "/images/market-icons/meta.svg", alt: "Meta", scale: 1.4 },
      { src: "/images/market-icons/google.svg", alt: "Google", scale: 1.2 },
    ],
  },
  {
    label: "IPO",
    description: "New listings from day one.",
    accent: "rose" as const,
    icons: [
      { src: "/images/market-icons/google.svg", alt: "Google", scale: 1.2 },
      { src: "/images/market-icons/palantir.svg", alt: "Palantir", scale: 1.8 },
    ],
  },
  {
    label: "Pre-IPO",
    description: "Private market access before listing.",
    accent: "orange" as const,
    icons: [
      { src: "/images/market-icons/oracle.svg", alt: "Oracle", scale: 1.5 },
      { src: "/images/market-icons/palantir.svg", alt: "Palantir", scale: 1.7 },
    ],
  },
] as const;

export const meetYourAgentPills = [
  { label: "Memory", icon: "memory" as const },
  { label: "Market awareness", icon: "markets" as const },
  { label: "Risk policies", icon: "shield" as const },
] as const;

export const coreFeatures = [
  {
    title: "Risks Engine",
    image: "/images/risks.svg",
    alt: "Habitrades risk engine with BTC perp trade checks and audit trail",
    description:
      "Set your guardrails once and let them run on every trade. Habitrades checks drawdown, leverage, and position size before execution—and routes anything outside your limits to approval.",
  },
  {
    title: "Artifacts",
    image: "/images/artifact.svg",
    alt: "Habitrades crypto basket artifact with allocation and risk warnings",
    description:
      "Turn agent replies into things you can act on. Trading plans, baskets, tickets, and signals stay compact in chat—and open into full detail when you're ready to review or execute.",
  },
  {
    title: "Vault",
    image: "/images/vault.svg",
    alt: "Habitrades vaults dashboard with TVL, performance, and depositor stats",
    description:
      "Pool capital behind agents with a real track record. Depositors see allocation, fees, performance, and risk in one place—managers run strategies without giving up transparency.",
  },
  {
    title: "Journal",
    image: "/images/journal.svg",
    alt: "Habitrades journal with market picks and trade signal summaries",
    description:
      "Capture what happened and why it mattered. Every trade, signal, and decision builds a replayable record—so you can review outcomes and sharpen how your agent trades.",
  },
  {
    title: "Context Engine",
    image: "/images/context.svg",
    alt: "Habitrades context engine assembling market, portfolio, and signal data",
    description:
      "Stop piecing together market state by hand. Habitrades assembles portfolio, signals, and market moves into bounded context—so your agent decides with the full picture, not raw noise.",
  },
];

export const featureUseCase = {
  cta: "Start Trading",
  href: "https://app.tryhabi.xyz",
};

export const institutionsSection = {
  description:
    "Integrate production-ready trading intelligence into your platform with Habitrades. From market context and structured trade decisions to risk policies, journals, and agent infrastructure.",
  primaryCta: {
    label: "Documentation",
    href: "/docs/overview",
  },
  secondaryCta: {
    label: "View API docs",
    href: "/docs/overview",
  },
} as const;

export const contextApiCode = `{
  "market": "BTC-PERP",

  "marketRegime": "Bullish",

  "confidence": 81,

  "summary": "BTC remains in an established uptrend with healthy spot demand.",

  "whatChanged": [
    "Open interest +6.8%",
    "Funding normalized",
    "Spot inflows increased"
  ],

  "supportingEvidence": [
    "Higher highs",
    "Strong spot demand",
    "Positive breadth"
  ],

  "contradictingEvidence": [
    "Momentum slowing",
    "Resistance overhead"
  ]

}`;

export const decisionApiCode = `{
  "action": "WAIT",

  "confidence": 74,

  "thesis": "Wait for a pullback into support before entering.",

  "bullCase": [
    "Trend remains intact",
    "Spot demand increasing"
  ],

  "bearCase": [
    "Momentum weakening",
    "Resistance overhead"
  ],

  "entry": 63000,

  "stop": 61500,

  "positionSize": "2%",

  "portfolioImpact": "Moderate",

  "nextReview": "4H candle close"
}`;

export const journalApiResponseCode = `{
  "tradeResult": "Loss",

  "pnl": "-2.3%",

  "thesis": "Expected continuation after support held.",

  "outcome": "Support failed following unexpected macro news.",

  "whatWorked": [
    "Risk respected",
    "Position sizing followed policy"
  ],

  "whatFailed": [
    "Entered before confirmation",
    "Ignored weakening momentum"
  ],

  "lesson": "Wait for confirmation during macro weeks.",

  "memoryUpdated": true,

  "experience": "+7",

  "replayAvailable": true
}`;

export const agentsApiResponseCode = `{
  "agent": "atlas.habi.any",

  "confidence": 81,

  "currentBias": "Bullish",

  "reasoning": "Trend remains intact with strong spot demand.",

  "recentLessons": [
    "Avoid FOMO entries",
    "Respect resistance"
  ],

  "strongestMarket": "BTC",

  "weakestMarket": "DOGE",

  "memoryHealth": "Growing",

  "lastImprovement": "+3 Confidence",


  "nextReview": "4H Candle Close"


}`;

export const riskApiResponseCode = `{
  "status": "Approved",

  "overallRisk": "Medium",

  "riskScore": 32,


  "checks": {
    "positionSize": "Pass",
    "portfolioExposure": "Pass",
    "leverage": "Pass",
    "dailyLossLimit": "Pass",
    "drawdownLimit": "Pass"
  },

  "portfolioExposure": {
    "before": "18%",
    "after": "22%"
  },

  "approvalRequired": false,


  "recommendation": "Position fits within current portfolio and risk policy."

}`;

const decisionAndJournalDescription =
  "Generate explainable trade decisions with thesis, bull case, bear case, confidence, portfolio impact, and automatically convert every trade into structured learning.";

export const institutionFeatures = [
  {
    tabLabel: "Context API",
    headline: "Context Engine",
    description:
      "Convert raw market data into structured context by identifying what changed, why it matters, supporting evidence, contradictions, confidence, and market regime.",
    showcase: {
      type: "api" as const,
      code: contextApiCode,
    },
    alt: "Habitrades Context API response",
  },
  {
    tabLabel: "Risk API",
    headline: "Risk Infrastructure",
    description:
      "Protect every trade with configurable policies including leverage limits, exposure controls, drawdown protection, approval workflows, and automated pre-trade validation.",
    showcase: {
      type: "api" as const,
      code: riskApiResponseCode,
    },
    alt: "Habitrades Risk API response",
  },
  {
    tabLabel: "Journal API",
    headline: "White-Label Platform",
    description:
      "Launch your own branded trading experience with custom applications, SDKs, APIs, domains, branding, onboarding, and customer-facing trading agents powered by Habitrades.",
    showcase: {
      type: "api" as const,
      code: journalApiResponseCode,
    },
    alt: "Habitrades Journal API response",
  },
  {
    tabLabel: "Decision API",
    headline: "Decision & Journal APIs",
    description: decisionAndJournalDescription,
    showcase: {
      type: "api" as const,
      code: decisionApiCode,
    },
    alt: "Habitrades Decision API response",
  },
  {
    tabLabel: "Agents API",
    headline: "Agent Infrastructure",
    description:
      "Deploy persistent trading agents with memory, identity, journals, configuration, permissions, and performance tracking. Every agent continuously improves from its own trading history.",
    showcase: {
      type: "api" as const,
      code: agentsApiResponseCode,
    },
    alt: "Habitrades Agents API response",
  },
] as const;

export const benefitsFeaturedTitles = [
  "Receipt For Everything",
  "Continuous Condition Monitoring",
  "One chat, All venues",
  "Paper Mode For Safe Testing",
] as const;

export const benefits = [
  {
    title: "Receipt For Everything",
    description:
      "Configurable drawdown limits, max leverage, per-trade risk, and automated risk checks before execution.",
    image: "/web/receipt2.svg",
    alt: "Habitrades trade receipts and risk audit trail",
    imageLayout: "natural" as const,
    imageWidth: 319,
    imageHeight: 340,
    imageVisibleRatio: 0.72,
    imageScale: 0.86,
    imageAnchor: "bottom" as const,
    imagePlacement: "top" as const,
  },
  {
    title: "Continuous Condition Monitoring",
    description:
      "Agents watch price thresholds, funding rates, and news for your alerts around the clock.",
    image: "/web/monitoring.svg",
    alt: "Habitrades continuous market condition monitoring",
    imageLayout: "natural" as const,
    imageWidth: 319,
    imageHeight: 645,
    imageVisibleRatio: 0.72,
    imageScale: 0.86,
    imageAnchor: "top" as const,
    imagePlacement: "bottom" as const,
  },
  {
    title: "Paper Mode For Safe Testing",
    description:
      "Test strategies and agent behavior without real capital before switching to live trading.",
    image: "/web/paper.svg",
    alt: "Habitrades paper trading mode dashboard",
    imageLayout: "natural" as const,
    imageWidth: 319,
    imageHeight: 645,
    imageVisibleRatio: 0.72,
    imageScale: 0.86,
    imageAnchor: "top" as const,
    imagePlacement: "bottom" as const,
  },
  {
    title: "Plain Language Strategies",
    description:
      "Describe your edge in one sentence; the agent translates it into executable parameters.",
    image: "/images/artifact.svg",
    alt: "Habitrades plain language strategy artifacts",
  },
  {
    title: "One chat, All venues",
    description:
      "Query positions, balances, and P&L across Hyperliquid and Polymarket from a single conversation.",
    image: "/web/venue.svg",
    alt: "Habitrades unified chat across trading venues",
    imageLayout: "natural" as const,
    imageWidth: 319,
    imageHeight: 340,
    imageVisibleRatio: 0.72,
    imageScale: 0.86,
    imageAnchor: "bottom" as const,
    imagePlacement: "top" as const,
  },
  {
    title: "Execution Planning",
    description:
      "Complex multi-step trades are broken into ordered plans with reasoning before you approve.",
    image: "/images/new-core-strategy.png",
    alt: "Habitrades execution planning with structured trade steps",
  },
] as const;

export const howItWorksSteps = [
  {
    title: "Create agent",
    description: "Build and activate your personal trading agent.",
    icon: "agent",
  },
  {
    title: "Set risk rules",
    description: "Define limits, leverage, and execution permissions.",
    icon: "shield",
  },
  {
    title: "Connect markets",
    description:
      "Trade perps, tokenised stocks, IPOs, forex, and commodities.",
    icon: "markets",
  },
  {
    title: "Give intent or strategy",
    description: "Describe your edge or deploy a ready-made strategy.",
    icon: "strategy",
  },
  {
    title: "Monitor, trade, and learn",
    description:
      "Your agent watches markets, executes within rules, and builds memory.",
    icon: "memory",
  },
] as const;

export const faqs = [
  {
    question: "What is Habitrades?",
    answer:
      "Habitrades is a privacy-focused agentic trading platform where users create their own AI trading agents, build strategies around their habits, and trade across markets like Hyperliquid and Polymarket with risk controls.",
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
    question: "What markets does Habitrades support?",
    answer:
      "Habitrades is built for price and probability markets, starting with Hyperliquid for trading perps and Polymarket for trading event outcomes.",
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
