import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { NextResponse } from "next/server";
import { client } from "@/sanity/client";

const token = process.env.SANITY_API_READ_TOKEN;

export async function GET(request: Request) {
  if (!token) {
    return NextResponse.json(
      {
        error:
          "Website preview is not connected yet. Add SANITY_API_READ_TOKEN from Sanity → API → Tokens.",
      },
      { status: 503 },
    );
  }

  const { GET } = defineEnableDraftMode({
    client: client.withConfig({ token }),
  });
  return GET(request);
}
