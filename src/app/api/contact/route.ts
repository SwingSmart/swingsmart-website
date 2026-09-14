import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string>;
  if (body.company?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!isSanityConfigured || !token) {
    return NextResponse.json(
      { error: "Enquiries are temporarily unavailable." },
      { status: 503 },
    );
  }

  const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
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

  return NextResponse.json({ ok: true });
}
