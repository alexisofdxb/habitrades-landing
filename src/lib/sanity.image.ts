import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient, sanityDataset, sanityProjectId } from "@/src/lib/sanity.client";

const builder =
  sanityClient && sanityProjectId
    ? imageUrlBuilder({
        projectId: sanityProjectId,
        dataset: sanityDataset,
      })
    : null;

export function urlForImage(source: SanityImageSource) {
  if (!builder) {
    throw new Error("Sanity image builder is not configured.");
  }

  return builder.image(source).auto("format").fit("max");
}