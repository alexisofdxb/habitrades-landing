import { createClient } from "@sanity/client";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export function isSanityConfigured(): boolean {
  return Boolean(sanityProjectId);
}

export const sanityClient = isSanityConfigured()
  ? createClient({
      projectId: sanityProjectId!,
      dataset: sanityDataset,
      apiVersion: "2024-01-01",
      useCdn: true,
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null;