import { NextResponse } from "next/server";
import { trackingPayloadSchema } from "@/schemas/tracking-schema";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid JSON payload",
      },
      { status: 400 },
    );
  }

  const parsed = trackingPayloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid tracking payload",
        issues: parsed.error.issues,
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    receivedAt: new Date().toISOString(),
    payload: parsed.data,
  });
}
