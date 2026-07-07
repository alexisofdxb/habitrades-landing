import { defineArrayMember, defineField, defineType } from "sanity";

export const blockContent = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              defineField({
                title: "URL",
                name: "href",
                type: "url",
                validation: (rule) => rule.uri({ allowRelative: true }),
              }),
            ],
          },
          {
            title: "Internal doc link",
            name: "docLink",
            type: "object",
            fields: [
              defineField({
                title: "Page",
                name: "page",
                type: "reference",
                to: [{ type: "docPage" }],
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Caption",
        }),
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "codeBlock",
      title: "Code block",
      fields: [
        defineField({
          name: "language",
          title: "Language",
          type: "string",
          options: {
            list: [
              { title: "TypeScript", value: "typescript" },
              { title: "JavaScript", value: "javascript" },
              { title: "Bash", value: "bash" },
              { title: "JSON", value: "json" },
              { title: "Plain text", value: "text" },
            ],
          },
          initialValue: "typescript",
        }),
        defineField({
          name: "code",
          title: "Code",
          type: "text",
          rows: 12,
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: { language: "language" },
        prepare({ language }) {
          return { title: `Code (${language || "text"})` };
        },
      },
    }),
    defineArrayMember({
      type: "object",
      name: "callout",
      title: "Callout",
      fields: [
        defineField({
          name: "tone",
          title: "Tone",
          type: "string",
          options: {
            list: [
              { title: "Note", value: "note" },
              { title: "Tip", value: "tip" },
              { title: "Warning", value: "warning" },
            ],
          },
          initialValue: "note",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: { title: "title", tone: "tone" },
        prepare({ title, tone }) {
          return { title: title || "Callout", subtitle: tone };
        },
      },
    }),
  ],
});