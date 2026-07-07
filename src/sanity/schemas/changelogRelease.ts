import { defineField, defineType } from "sanity";

export const changelogCategories = [
  { title: "Markets", value: "markets" },
  { title: "Prediction", value: "prediction" },
  { title: "Agents", value: "agents" },
  { title: "Marketplace", value: "marketplace" },
  { title: "Platform", value: "platform" },
  { title: "Vaults", value: "vaults" },
  { title: "Leagues", value: "leagues" },
  { title: "Social", value: "social" },
  { title: "Account", value: "account" },
  { title: "Engagements", value: "engagements" },
  { title: "Staking", value: "staking" },
  { title: "Credits", value: "credits" },
  { title: "Plan", value: "plan" },
  { title: "Governance", value: "governance" },
];

function slugifyDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toISOString().slice(0, 10);
}

export const changelogRelease = defineType({
  name: "changelogRelease",
  title: "Changelog Release",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Release date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "date",
        slugify: slugifyDate,
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Sidebar label",
      description: 'Optional short label for the sidebar, e.g. "6.17".',
      type: "string",
    }),
    defineField({
      name: "afterHours",
      title: "After hours",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "entries",
      title: "Entries",
      type: "array",
      of: [
        {
          type: "object",
          name: "changelogEntry",
          fields: [
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: { list: changelogCategories },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "title", category: "category" },
            prepare({ title, category }) {
              return {
                title,
                subtitle: category,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  orderings: [
    {
      title: "Release date (newest)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      date: "date",
      label: "label",
      entries: "entries",
      afterHours: "afterHours",
    },
    prepare({ date, label, entries, afterHours }) {
      const parsed = date ? new Date(date) : null;
      const fallback =
        parsed && !Number.isNaN(parsed.getTime())
          ? `${parsed.getMonth() + 1}.${parsed.getDate()}`
          : "Release";

      return {
        title: label || fallback,
        subtitle: [
          afterHours ? "After hours" : null,
          `${entries?.length ?? 0} entries`,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});