"use client";

import ApiCodeShowcase from "@/src/components/ApiCodeShowcase";
import { ProductShowcaseForeground } from "@/src/components/ProductShowcaseFrame";
import type { institutionFeatures } from "@/src/data/site-content";

type InstitutionFeature = (typeof institutionFeatures)[number];

export function InstitutionShowcase({ feature }: { feature: InstitutionFeature }) {
  if (feature.showcase.type === "api") {
    return <ApiCodeShowcase code={feature.showcase.code} />;
  }

  return (
    <ProductShowcaseForeground
      src={feature.showcase.image}
      alt={feature.alt}
      sizes="calc(100vw - 64px)"
    />
  );
}

export function isApiShowcase(feature: InstitutionFeature) {
  return feature.showcase.type === "api";
}