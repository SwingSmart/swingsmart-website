"use client";

import { useState } from "react";
import { Button } from "@/components/ui/ButtonLink";
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
    "w-full border-0 border-b border-rule bg-transparent px-0 py-3 text-sm text-cream placeholder:text-muted/70 focus:border-cream focus:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-8 bg-transparent"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[0.68rem] uppercase tracking-[0.18em] text-cream/50">
            Name
          </label>
          <input id="name" name="name" required className={field} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[0.68rem] uppercase tracking-[0.18em] text-cream/50">
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
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-[0.68rem] uppercase tracking-[0.18em] text-cream/50">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className={field} autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="eventDate" className="mb-1.5 block text-[0.68rem] uppercase tracking-[0.18em] text-cream/50">
            Preferred date
          </label>
          <input id="eventDate" name="eventDate" type="date" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="packageInterest" className="mb-1.5 block text-[0.68rem] uppercase tracking-[0.18em] text-cream/50">
          Package
        </label>
        <select id="packageInterest" name="packageInterest" className={`${field} appearance-none`}>
          <option value="">Not sure yet</option>
          {packages.map((item) => (
            <option key={item.slug} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-[0.68rem] uppercase tracking-[0.18em] text-cream/50">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} className={field} />
      </div>
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </Button>
      {message ? (
        <p className={status === "error" ? "text-sm text-red-300" : "text-sm text-green-soft"} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
