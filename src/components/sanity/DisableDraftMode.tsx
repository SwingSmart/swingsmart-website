"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();
  if (isPresentationTool) return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-[60] border border-rule bg-surface px-4 py-2 text-sm text-cream hover:border-green-soft"
    >
      Exit preview
    </a>
  );
}
