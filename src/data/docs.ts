import type { PortableTextBlock } from "@portabletext/types";

export type DocPageSummary = {
  slug: string;
  title: string;
  order: number;
  version: string;
  lastUpdated: string;
  description?: string;
};

export type DocSectionNav = {
  slug: string;
  title: string;
  order: number;
  pages: DocPageSummary[];
};

export type DocPage = DocPageSummary & {
  section: {
    slug: string;
    title: string;
  };
  body: PortableTextBlock[];
};

const overviewBody = [
  {
    _type: "block",
    _key: "overview-1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "overview-1-span",
        text: "Habitrades is an agentic trading platform built around habits — your strategy, risk rules, and market context. This documentation explains how the platform works, how to integrate with it, and how to operate agents safely in production.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "overview-2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "overview-2-span",
        text: "In practical terms, Habitrades lets you ask clear questions about any workflow and get actionable answers:",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "overview-3",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "overview-3-span",
        text: "What is this agent's current risk posture and open exposure?",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "overview-4",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "overview-4-span",
        text: "Based on our policy, should we allow, review, or block this trade?",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "overview-5",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "overview-5-span",
        text: "What artifacts, proofs, and execution history support this decision?",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "overview-6",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "overview-6-span",
        text: "Built for traders and builders",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "overview-7",
    style: "h3",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "overview-7-span",
        text: "For traders",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "overview-8",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "overview-8-span",
        text: "Run agents with explicit habits: position sizing, drawdown limits, market filters, and review gates. Every action leaves an audit trail you can inspect before capital is deployed.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "overview-9",
    style: "h3",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "overview-9-span",
        text: "For builders",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "overview-10",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "overview-10-span",
        text: "Publish strategies to the marketplace, wire custom risk engines, and extend Habitrades with webhooks and APIs. Docs in this section cover authentication, agent lifecycle, and deployment patterns.",
        marks: [],
      },
    ],
  },
  {
    _type: "callout",
    _key: "overview-callout",
    tone: "note",
    title: "Getting started",
    body: "Create an account, connect a vault, and deploy your first agent from a marketplace template. See the Platform section for step-by-step guides.",
  },
] as PortableTextBlock[];

const howItWorksBody = [
  {
    _type: "block",
    _key: "hiw-1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "hiw-1-span",
        text: "Habitrades orchestrates agents through a predictable loop: observe market context, evaluate habits and risk rules, propose a plan, and execute only when policy allows.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "hiw-2",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "hiw-2-span",
        text: "The agent loop",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "hiw-3",
    style: "normal",
    listItem: "number",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "hiw-3-span",
        text: "Context — ingest prices, funding, sentiment, and portfolio state.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "hiw-4",
    style: "normal",
    listItem: "number",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "hiw-4-span",
        text: "Reason — agent drafts a trade plan with explicit rationale.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "hiw-5",
    style: "normal",
    listItem: "number",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "hiw-5-span",
        text: "Guard — risk engine and habits approve, flag, or reject.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "hiw-6",
    style: "normal",
    listItem: "number",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "hiw-6-span",
        text: "Execute — orders route through connected venues and vaults.",
        marks: [],
      },
    ],
  },
  {
    _type: "codeBlock",
    _key: "hiw-code",
    language: "typescript",
    code: `// Example: habit check before execution\nconst decision = await riskEngine.evaluate({\n  agentId: "momentum-btc",\n  proposedNotional: 12_500,\n  maxDrawdownPct: 8,\n});\n\nif (decision.status === "allow") {\n  await executor.submit(decision.plan);\n}`,
  },
] as PortableTextBlock[];

const agentsBody = [
  {
    _type: "block",
    _key: "agents-1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "agents-1-span",
        text: "Agents are autonomous trading workers bound to a strategy template, vault, and set of habits. Each agent maintains its own execution history, artifacts, and risk envelope.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "agents-2",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "agents-2-span",
        text: "Lifecycle states",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "agents-3",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "agents-3-span",
        text: "Draft → Active → Paused → Archived. Only Active agents may submit orders. Paused agents retain context but skip execution until resumed.",
        marks: [],
      },
    ],
  },
  {
    _type: "callout",
    _key: "agents-callout",
    tone: "warning",
    title: "Production safety",
    body: "Always attach a risk profile before promoting an agent to Active. Sandbox mode is available for paper trading without capital exposure.",
  },
] as PortableTextBlock[];

export const staticDocSections: DocSectionNav[] = [
  {
    slug: "introduction",
    title: "Introduction",
    order: 0,
    pages: [
      {
        slug: "overview",
        title: "Overview",
        order: 0,
        version: "v1.0.4-beta",
        lastUpdated: "2026-02-07",
        description:
          "What Habitrades is, who it is for, and how documentation is organized.",
      },
      {
        slug: "how-it-works",
        title: "How it Works",
        order: 1,
        version: "v1.0.4-beta",
        lastUpdated: "2026-02-07",
        description: "The agent loop from context to execution.",
      },
    ],
  },
  {
    slug: "platform",
    title: "Platform",
    order: 1,
    pages: [
      {
        slug: "agents",
        title: "Agents",
        order: 0,
        version: "v1.0.2-beta",
        lastUpdated: "2026-02-05",
        description: "Agent lifecycle, habits, and deployment.",
      },
    ],
  },
];

export const staticDocPages: DocPage[] = [
  {
    slug: "overview",
    title: "Overview",
    order: 0,
    version: "v1.0.4-beta",
    lastUpdated: "2026-02-07",
    description:
      "What Habitrades is, who it is for, and how documentation is organized.",
    section: { slug: "introduction", title: "Introduction" },
    body: overviewBody,
  },
  {
    slug: "how-it-works",
    title: "How it Works",
    order: 1,
    version: "v1.0.4-beta",
    lastUpdated: "2026-02-07",
    description: "The agent loop from context to execution.",
    section: { slug: "introduction", title: "Introduction" },
    body: howItWorksBody,
  },
  {
    slug: "agents",
    title: "Agents",
    order: 0,
    version: "v1.0.2-beta",
    lastUpdated: "2026-02-05",
    description: "Agent lifecycle, habits, and deployment.",
    section: { slug: "platform", title: "Platform" },
    body: agentsBody,
  },
];

export const defaultDocSlug = "overview";