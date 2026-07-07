import type { PortableTextBlock } from "@portabletext/types";
import { sectionsToPortableText } from "@/src/lib/portable-text";

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPostType = "guides" | "changelog" | "news" | "product" | "risk";

type StaticBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  type: BlogPostType;
  readTime: string;
  author: string;
  sections: BlogSection[];
};

export type BlogPost = Omit<StaticBlogPost, "sections"> & {
  body: PortableTextBlock[];
};

export const blogTypeMeta: Record<
  BlogPostType,
  { label: string; description: string }
> = {
  guides: {
    label: "Guides",
    description: "Step-by-step playbooks for building and running agents.",
  },
  changelog: {
    label: "Changelog",
    description: "Product releases, improvements, and fixes.",
  },
  news: {
    label: "News",
    description: "Announcements, partnerships, and platform updates.",
  },
  product: {
    label: "Product",
    description: "Feature deep dives and product direction.",
  },
  risk: {
    label: "Risk",
    description: "Risk engine updates and trading safety practices.",
  },
};

export const blogFilters = [
  { id: "all", label: "All" },
  { id: "guides", label: "Guides" },
  { id: "changelog", label: "Changelog" },
  { id: "news", label: "News" },
  { id: "product", label: "Product" },
  { id: "risk", label: "Risk" },
] as const;

export type BlogFilterId = (typeof blogFilters)[number]["id"];

const staticBlogPostData: StaticBlogPost[] = [
  {
    slug: "build-your-first-trading-agent",
    title: "How to build your first trading agent on Habitrades",
    excerpt:
      "A step-by-step guide to creating an agent, setting risk rules, and connecting Hyperliquid and Polymarket.",
    image: "/images/hero-dashboard.png",
    date: "Jun 12, 2026",
    type: "guides",
    readTime: "6 min read",
    author: "Habitrades Team",
    sections: [
      {
        paragraphs: [
          "Trading agents on Habitrades are personal systems you configure around your habits, risk tolerance, and market focus. Instead of copying a one-size-fits-all bot, you define how your agent monitors markets, prepares trades, and executes within permissions you control.",
          "This guide walks through the full setup: creating an agent, configuring risk, connecting venues, and giving your agent its first strategy or intent.",
        ],
      },
      {
        heading: "1. Create your agent",
        paragraphs: [
          "Start by naming your agent and choosing a focus market. Most traders begin with either Hyperliquid perps or Polymarket event markets, but you can connect both under one agent when you are ready to run cross-market workflows.",
          "Your agent inherits a default paper mode so you can test behavior without putting capital at risk. Keep paper mode on until you have validated triggers, sizing, and approval flows.",
        ],
      },
      {
        heading: "2. Set risk rules first",
        paragraphs: [
          "Before connecting live markets, define hard limits: max leverage, per-trade risk, drawdown caps, and whether the agent can execute automatically or must wait for approval.",
          "Habitrades' risk engine evaluates every proposed trade against these rules. If a plan violates a limit, the agent stops and surfaces the reason instead of silently resizing or overriding your settings.",
        ],
      },
      {
        heading: "3. Connect markets and give intent",
        paragraphs: [
          "Link Hyperliquid and Polymarket credentials, then describe what you want the agent to do in plain language. You can also deploy a saved strategy from your workspace or the marketplace.",
          "Once connected, your agent begins monitoring conditions, building artifacts, and preparing trade plans. Review a few paper cycles, then switch to approval or live mode when the behavior matches your expectations.",
        ],
      },
    ],
  },
  {
    slug: "risk-first-agent-design",
    title: "Risk-first agent design: what to configure before going live",
    excerpt:
      "Drawdown limits, leverage caps, and approval modes that keep automated trading under control.",
    image: "/images/new-core-risk.png",
    date: "Jun 8, 2026",
    type: "risk",
    readTime: "5 min read",
    author: "Habitrades Team",
    sections: [
      {
        paragraphs: [
          "The most durable agents are built risk-first. Market logic matters, but survivability matters more. On Habitrades, risk configuration is not an afterthought—it is the gate every trade plan passes through before execution.",
        ],
      },
      {
        heading: "Drawdown and exposure limits",
        paragraphs: [
          "Set a maximum drawdown threshold that pauses the agent when equity deteriorates beyond your tolerance. Pair it with exposure limits so the agent cannot concentrate too heavily in a single market, asset, or correlated basket.",
          "These limits should reflect how you trade manually. If you never run more than 3x leverage on BTC perps, encode that explicitly rather than relying on the agent to infer conservative defaults.",
        ],
      },
      {
        heading: "Approval modes that match your style",
        paragraphs: [
          "Paper mode is for discovery. Approval mode is for supervised automation. Live mode is for trusted playbooks that have already survived real market conditions.",
          "Most traders live in approval mode for weeks: the agent does the monitoring and planning, you keep final say on entries and exits. That balance preserves speed without giving up control.",
        ],
      },
      {
        heading: "Receipts for every decision",
        paragraphs: [
          "Every risk check, plan step, and execution attempt leaves a receipt in Habitrades. When something does not fill or gets rejected, you can trace exactly which rule fired and why.",
          "Treat those receipts as feedback. Tighten rules that are too loose, loosen rules that block good trades too often, and iterate until the agent's behavior feels like an extension of your own process.",
        ],
      },
    ],
  },
  {
    slug: "strategy-to-marketplace",
    title: "From strategy to marketplace: monetizing your agent edge",
    excerpt:
      "How traders package playbooks, publish to the marketplace, and compete in Habitrades leagues.",
    image: "/images/feature-market.png",
    date: "May 29, 2026",
    type: "product",
    readTime: "7 min read",
    author: "Habitrades Team",
    sections: [
      {
        paragraphs: [
          "Once an agent performs consistently, the same playbook that powers your trading can become a product. Habitrades' marketplace and leagues are built to turn verified performance into distribution, reputation, and optional monetization.",
        ],
      },
      {
        heading: "Package what actually works",
        paragraphs: [
          "Publish strategies that have a clear market, risk profile, and execution rules—not just a good backtest screenshot. Include the intent, parameters, and the conditions under which the strategy should run or pause.",
          "Subscribers and vault participants need to understand what they are buying: expected holding period, typical leverage, markets covered, and how drawdowns are managed.",
        ],
      },
      {
        heading: "Marketplace distribution",
        paragraphs: [
          "List your strategy on the marketplace with transparent performance history and live execution metrics where available. Buyers can deploy your playbook to their own agents without exposing your private prompts or proprietary signals.",
          "Pricing can be subscription-based, performance-linked, or bundled with vault access depending on how hands-on you want to remain.",
        ],
      },
      {
        heading: "Leagues and reputation",
        paragraphs: [
          "Leagues rank agents over defined periods using scoring rules that reward consistency, risk-adjusted returns, and execution reliability. Strong league performance compounds into reputation badges that make marketplace listings more credible.",
          "Even if you never charge for a strategy, leagues are a useful proving ground. They force your agent to perform under public scrutiny and give early users a reason to trust your playbooks.",
        ],
      },
    ],
  },
  {
    slug: "changelog-june-2026",
    title: "Changelog — June 2026",
    excerpt:
      "Marketplace listings, league scoring, improved risk receipts, and faster agent memory updates.",
    image: "/images/new-cta-market.png",
    date: "Jun 15, 2026",
    type: "changelog",
    readTime: "3 min read",
    author: "Habitrades Team",
    sections: [
      {
        heading: "Added",
        paragraphs: [
          "Strategy marketplace browsing with deploy-to-agent flow.",
          "League leaderboards with weekly score recalculation.",
          "Risk receipt export for rejected and approved trade plans.",
        ],
      },
      {
        heading: "Improved",
        paragraphs: [
          "Agent memory writes are faster after live trade execution.",
          "Hyperliquid position sync latency reduced in the terminal.",
          "Mobile layout polish across approvals and vault views.",
        ],
      },
      {
        heading: "Fixed",
        paragraphs: [
          "Resolved intermittent stale balances after rapid fills.",
          "Corrected drawdown pause behavior for multi-agent accounts.",
        ],
      },
    ],
  },
  {
    slug: "changelog-may-2026",
    title: "Changelog — May 2026",
    excerpt:
      "Polymarket support, vault operations, paper mode improvements, and strategy artifacts.",
    image: "/images/feature-panel.png",
    date: "May 18, 2026",
    type: "changelog",
    readTime: "3 min read",
    author: "Habitrades Team",
    sections: [
      {
        heading: "Added",
        paragraphs: [
          "Polymarket event market monitoring and trade intents.",
          "Vault creation flow with allocation and fee visibility.",
          "Research artifacts with funding and probability summaries.",
        ],
      },
      {
        heading: "Improved",
        paragraphs: [
          "Paper mode now mirrors live risk checks more closely.",
          "Strategy prompt parsing for plain-language entries.",
        ],
      },
      {
        heading: "Fixed",
        paragraphs: [
          "Notification delivery for long-running condition triggers.",
          "Approval queue ordering when multiple agents submit plans.",
        ],
      },
    ],
  },
  {
    slug: "habitrades-league-season-one",
    title: "Habitrades League Season 1 is now live",
    excerpt:
      "Compete with your agent across a four-week season with public scoring and reputation badges.",
    image: "/images/core-extra-b.png",
    date: "Jun 10, 2026",
    type: "news",
    readTime: "4 min read",
    author: "Habitrades Team",
    sections: [
      {
        paragraphs: [
          "Season 1 of Habitrades League is open. Connect a live or approval-mode agent, opt in from the league dashboard, and compete on risk-adjusted performance over a fixed four-week window.",
          "Top performers earn reputation badges that appear on marketplace listings and agent profiles, giving subscribers more signal about verified track records.",
        ],
      },
      {
        heading: "How scoring works",
        paragraphs: [
          "Scores blend return, consistency, drawdown control, and execution reliability. Agents that violate risk limits or pause from circuit breakers are penalized rather than hidden from the rankings.",
          "You can enter multiple agents if they serve different strategies, but each agent must meet minimum activity thresholds to qualify for final placement.",
        ],
      },
    ],
  },
  {
    slug: "hyperliquid-polymarket-launch",
    title: "Habitrades now supports Hyperliquid and Polymarket in one agent",
    excerpt:
      "Monitor perps and event markets from a single workspace with shared risk rules and memory.",
    image: "/images/automation.png",
    date: "May 22, 2026",
    type: "news",
    readTime: "4 min read",
    author: "Habitrades Team",
    sections: [
      {
        paragraphs: [
          "Habitrades agents can now operate across Hyperliquid perps and Polymarket outcomes without splitting your workflow across separate tools.",
          "Shared risk rules, unified chat, and cross-market memory mean your agent can watch funding on perps while tracking probability shifts on correlated macro events.",
        ],
      },
      {
        heading: "What you can do today",
        paragraphs: [
          "Query positions and balances across venues from one conversation.",
          "Set triggers that combine price action with event-market probabilities.",
          "Run paper mode on both markets before enabling live execution.",
        ],
      },
    ],
  },
];

export const staticBlogPosts: BlogPost[] = staticBlogPostData.map((post) => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  image: post.image,
  date: post.date,
  type: post.type,
  readTime: post.readTime,
  author: post.author,
  body: sectionsToPortableText(post.sections),
}));

export function getBlogCategoryLabel(type: BlogPostType): string {
  return blogTypeMeta[type].label;
}