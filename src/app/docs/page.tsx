import { redirect } from "next/navigation";
import { getDefaultDocSlug } from "@/src/lib/docs";

export const revalidate = 60;

export default async function DocsIndexPage() {
  const slug = await getDefaultDocSlug();
  redirect(`/docs/${slug}`);
}