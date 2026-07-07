"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

const hiddenDocTypes = ["docSection", "docPage"];

export default defineConfig({
  name: "default",
  title: "Habitrades CMS",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Documentation")
              .child(
                S.list()
                  .title("Documentation")
                  .items([
                    S.documentTypeListItem("docSection").title("Sections"),
                    S.documentTypeListItem("docPage").title("Pages"),
                  ]),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !hiddenDocTypes.includes(item.getId() ?? ""),
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});