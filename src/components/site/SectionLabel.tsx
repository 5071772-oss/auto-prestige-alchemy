import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary"><span aria-hidden="true" className="h-px w-8 bg-primary/60" />{children}</div>;
}
