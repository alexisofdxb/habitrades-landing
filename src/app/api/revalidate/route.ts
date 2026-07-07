import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

type SanityWebhookBody = {
  _type?: string;
  slug?: { current?: string };
};

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: SanityWebhookBody = {};

  try {
    body = (await request.json()) as SanityWebhookBody;
  } catch {
    body = {};
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/changelog");
  revalidatePath("/docs");

  const slug = body.slug?.current;
  if (slug) {
    if (body._type === "changelogRelease") {
      revalidatePath(`/changelog/${slug}`);
    } else if (body._type === "docPage") {
      revalidatePath(`/docs/${slug}`);
    } else {
      revalidatePath(`/blog/${slug}`);
    }
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}