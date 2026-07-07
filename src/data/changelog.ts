export const changelogCategories = [
  "markets",
  "prediction",
  "agents",
  "marketplace",
  "platform",
  "vaults",
  "leagues",
  "social",
  "account",
  "engagements",
  "staking",
  "credits",
  "plan",
  "governance",
] as const;

export type ChangelogCategory = (typeof changelogCategories)[number];

export type ChangelogEntry = {
  category: ChangelogCategory;
  title: string;
  description: string;
};

export type ChangelogRelease = {
  slug: string;
  date: string;
  label: string;
  title: string;
  afterHours: boolean;
  entries: ChangelogEntry[];
};

export type ChangelogCategoryTone = "green" | "orange" | "blue" | "violet";

export const changelogCategoryMeta: Record<
  ChangelogCategory,
  { label: string; tone: ChangelogCategoryTone }
> = {
  markets: { label: "Markets", tone: "orange" },
  prediction: { label: "Prediction", tone: "orange" },
  agents: { label: "Agents", tone: "green" },
  marketplace: { label: "Marketplace", tone: "blue" },
  platform: { label: "Platform", tone: "green" },
  vaults: { label: "Vaults", tone: "blue" },
  leagues: { label: "Leagues", tone: "violet" },
  social: { label: "Social", tone: "violet" },
  account: { label: "Account", tone: "blue" },
  engagements: { label: "Engagements", tone: "green" },
  staking: { label: "Staking", tone: "orange" },
  credits: { label: "Credits", tone: "blue" },
  plan: { label: "Plan", tone: "violet" },
  governance: { label: "Governance", tone: "violet" },
};

export const changelogCategoryToneClass: Record<ChangelogCategoryTone, string> = {
  green: "bg-[#5fd491]",
  orange: "bg-[#f0a05a]",
  blue: "bg-[#6ea8ff]",
  violet: "bg-[#b38cff]",
};

export function getChangelogCategoryLabel(category: ChangelogCategory): string {
  return changelogCategoryMeta[category].label;
}

export const staticChangelogReleases: ChangelogRelease[] = [
  {
    slug: "2026-06-17",
    date: "2026-06-17T12:00:00.000Z",
    label: "6.17",
    title: "6.17.2026",
    afterHours: false,
    entries: [
      {
        category: "agents",
        title: "Faster agent memory writes",
        description:
          "Agent memory updates land faster after live trade execution, so follow-up prompts reflect the latest fills and positions.",
      },
      {
        category: "platform",
        title: "General stability and performance improvements",
        description:
          "Continued improvements to reliability, speed, and overall polish across the platform.",
      },
    ],
  },
  {
    slug: "2026-06-15",
    date: "2026-06-15T12:00:00.000Z",
    label: "6.15",
    title: "6.15.2026",
    afterHours: false,
    entries: [
      {
        category: "marketplace",
        title: "Strategy marketplace browsing",
        description:
          "Browse marketplace listings and deploy strategies directly to an agent from the release view.",
      },
      {
        category: "leagues",
        title: "League leaderboards",
        description:
          "Weekly league score recalculation is now live with public placement on agent profiles.",
      },
      {
        category: "platform",
        title: "Risk receipt export",
        description:
          "Export receipts for rejected and approved trade plans from the approvals queue.",
      },
    ],
  },
  {
    slug: "2026-06-10",
    date: "2026-06-10T12:00:00.000Z",
    label: "6.10",
    title: "6.10.2026",
    afterHours: false,
    entries: [
      {
        category: "leagues",
        title: "Habitrades League Season 1",
        description:
          "Season 1 is open. Opt in from the league dashboard to compete on risk-adjusted performance over a four-week window.",
      },
      {
        category: "agents",
        title: "Approval queue ordering",
        description:
          "Fixed approval queue ordering when multiple agents submit plans at the same time.",
      },
    ],
  },
  {
    slug: "2026-05-22",
    date: "2026-05-22T12:00:00.000Z",
    label: "5.22",
    title: "5.22.2026",
    afterHours: false,
    entries: [
      {
        category: "markets",
        title: "Hyperliquid support",
        description:
          "Agents can monitor perps, sync positions, and prepare trade plans on Hyperliquid from one workspace.",
      },
      {
        category: "prediction",
        title: "Polymarket support",
        description:
          "Event market monitoring and trade intents are now available without splitting your workflow across tools.",
      },
      {
        category: "agents",
        title: "Shared risk rules and memory",
        description:
          "Cross-market memory and unified risk rules now apply when running Hyperliquid and Polymarket under one agent.",
      },
    ],
  },
  {
    slug: "2026-05-18",
    date: "2026-05-18T12:00:00.000Z",
    label: "5.18",
    title: "5.18.2026",
    afterHours: true,
    entries: [
      {
        category: "vaults",
        title: "Vault creation flow",
        description:
          "Create vaults with allocation and fee visibility before inviting depositors.",
      },
      {
        category: "prediction",
        title: "Polymarket event monitoring",
        description:
          "Agents can watch Polymarket outcomes and prepare intents alongside perp workflows.",
      },
      {
        category: "agents",
        title: "Paper mode risk parity",
        description:
          "Paper mode now mirrors live risk checks more closely before you enable approvals or live execution.",
      },
      {
        category: "platform",
        title: "Notification delivery fixes",
        description:
          "Resolved intermittent missed notifications for long-running condition triggers.",
      },
    ],
  },
];