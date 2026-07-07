import { defineField, defineType } from "sanity";

export const docPage = defineType({
  name: "docPage",
  title: "Doc Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "section",
      title: "Section",
      type: "reference",
      to: [{ type: "docSection" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order within section",
      type: "number",
      validation: (rule) => rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: "version",
      title: "Version",
      type: "string",
      description: 'Displayed in the page header, e.g. "v1.0.4-beta"',
      initialValue: "v1.0.0",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last updated",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short summary used for search and SEO.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (rule) => rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Last updated (newest)",
      name: "lastUpdatedDesc",
      by: [{ field: "lastUpdated", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      version: "version",
      section: "section.title",
      date: "lastUpdated",
    },
    prepare({ title, version, section, date }) {
      return {
        title,
        subtitle: [section, version, date].filter(Boolean).join(" · "),
      };
    },
  },
});