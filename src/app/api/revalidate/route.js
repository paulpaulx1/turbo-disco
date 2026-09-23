import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Sanity calls this on every publish, unpublish or delete.
// Live updates only reach pages someone has open; this clears the cache for
// everyone else, so the next visitor always gets the latest content.
export async function POST(req) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody(req, secret, true);
    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }

    // The site is small, so clear every page rather than tracking which
    // pages a changed painting, portfolio or setting appears on.
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      type: body?._type,
      id: body?._id,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
