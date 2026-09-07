import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/live";
import { isSanityConfigured } from "@/sanity/env";

export async function LivePreview() {
  if (!isSanityConfigured) return null;
  const { isEnabled } = await draftMode();

  return (
    <>
      <SanityLive />
      {isEnabled ? <VisualEditing /> : null}
    </>
  );
}
