"use client";

import { StudioProvider } from "@/context/StudioProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <StudioProvider>{children}</StudioProvider>;
}
