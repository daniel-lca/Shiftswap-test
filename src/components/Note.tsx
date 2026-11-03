import type { ReactNode } from 'react';

// Sticky-note callout for reviewer annotations. The only non-gray element allowed.
export function Note({ children }: { children: ReactNode }) {
  return (
    <aside className="border-l-4 border-yellow-400 bg-yellow-100 px-3 py-2 text-sm text-yellow-900">
      {children}
    </aside>
  );
}
