import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string>;
  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (isSanityConfigured && process.env.SANITY_API_WRITE_TOKEN) {
    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
    });
    await writeClient.create({
      _type: "enquiry",
      name,
      email,
      phone: body.phone || "",
      eventDate: body.eventDate || "",
      packageInterest: body.packageInterest || "",
      message,
      receivedAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({ ok: true });
}
