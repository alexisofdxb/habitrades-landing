"use client";

import ApiCodeShowcase from "@/src/components/ApiCodeShowcase";
import type { institutionFeatures } from "@/src/data/site-content";

type InstitutionFeature = (typeof institutionFeatures)[number];

export function InstitutionShowcase({ feature }: { feature: InstitutionFeature }) {
  return (
    <ApiCodeShowcase
      code={feature.showcase.code}
      language={
        "language" in feature.showcase ? feature.showcase.language : "json"
      }
    />
  );
}

export function isApiShowcase(_feature: InstitutionFeature) {
  return true;
}