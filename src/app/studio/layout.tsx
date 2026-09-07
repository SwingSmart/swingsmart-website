import type { ReactNode } from "react";
import { NextStudioLayout } from "next-sanity/studio";

export default function StudioLayout({ children }: { children: ReactNode }) {
  return <NextStudioLayout>{children}</NextStudioLayout>;
}
