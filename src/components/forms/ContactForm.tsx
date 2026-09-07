"use client";

import { useState } from "react";
import type { EventPackage } from "@/lib/types";

export function ContactForm({ packages }: { packages: EventPackage[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      setMessage("Thanks — we’ll be in touch shortly.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please email hello@swingsmart.co.uk instead.");
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-mist placeholder:text-muted/70";

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-line bg-panel p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm">
          Name
        </label>
        <input id="name" name="name" required className={field} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={field}
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" className={field} autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="eventDate" className="mb-1 block text-sm">
          Preferred date
        </label>
        <input id="eventDate" name="eventDate" className={field} />
      </div>
      <div>
        <label htmlFor="packageInterest" className="mb-1 block text-sm">
          Package
        </label>
        <select id="packageInterest" name="packageInterest" className={field}>
          <option value="">Not sure yet</option>
          {packages.map((item) => (
            <option key={item.slug} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} className={field} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-green px-6 py-3 text-sm font-semibold text-ink hover:bg-green-bright disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      {message ? (
        <p className={status === "error" ? "text-sm text-red-300" : "text-sm text-green"} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
