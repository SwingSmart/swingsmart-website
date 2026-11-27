import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  enquiryHtml,
  enquirySubject,
  enquiryText,
  fromAddress,
  parseContactSubmission,
  recipientFromEnv,
} from "@/lib/contact-form";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const attempts = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function tooManyAttempts(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(ip, recent);
    return true;
  }
  recent.push(now);
  attempts.set(ip, recent);
  return false;
}

function fail(status: number, error: string) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return fail(400, "Please try again.");
  }

  if (tooManyAttempts(clientIp(request))) {
    return fail(429, "Please wait a moment and try again.");
  }

  const parsed = parseContactSubmission(body, request.headers.get("referer") || undefined);
  if (!parsed.ok) {
    return fail(400, parsed.error);
  }

  if (parsed.spam) {
    return NextResponse.json({ ok: true });
  }

  const recipient = recipientFromEnv();
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!recipient || !apiKey) {
    console.error(
      "Contact form is not configured. Set FORM_RECIPIENT_EMAIL and RESEND_API_KEY. Mail was not sent.",
    );
    return fail(503, "This form is not taking messages just now.");
  }

  const submittedAt = new Date();
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromAddress(recipient),
    to: recipient,
    replyTo: parsed.payload.email,
    subject: enquirySubject(parsed.payload.name),
    text: enquiryText(parsed.payload, submittedAt),
    html: enquiryHtml(parsed.payload, submittedAt),
  });

  if (error) {
    console.error("Resend failed to send enquiry", error);
    return fail(502, "This form is not taking messages just now.");
  }

  return NextResponse.json({ ok: true });
}
