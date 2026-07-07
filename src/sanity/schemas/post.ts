import { defineField, defineType } from "sanity";

const blogTypes = [
  { title: "Guides", value: "guides" },
  { title: "Changelog", value: "changelog" },
  { title: "News", value: "news" },
  { title: "Product", value: "product" },
  { title: "Risk", value: "risk" },
];

export const post = defineType({
  name: "post",
  title: "Blog Post",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "type",
      title: "Category",
      type: "string",
      options: { list: blogTypes },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read time",
      type: "string",
      initialValue: "5 min read",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "Habitrades Team",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "sections",
      title: "Sections (legacy)",
      type: "array",
      deprecated: {
        reason: "Use Body instead. This field will be removed after migration.",
      },
      hidden: true,
      readOnly: true,
      of: [
        {
          type: "object",
          name: "section",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({
              name: "paragraphs",
              title: "Paragraphs",
              type: "array",
              of: [{ type: "text" }],
            }),
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Published (newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      media: "coverImage",
      date: "publishedAt",
    },
    prepare({ title, type, media, date }) {
      return {
        title,
        subtitle: [type, date?.slice(0, 10)].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});