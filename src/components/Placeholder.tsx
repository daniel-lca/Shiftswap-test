// Gray box with a diagonal cross, used for any image, video, map, or chart.
export function Placeholder({ label, className = '' }: { label?: string; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-neutral-300 bg-neutral-100 ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full text-neutral-300" preserveAspectRatio="none" aria-hidden>
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
      </svg>
      {label && <span className="relative bg-neutral-100 px-2 text-sm text-neutral-500">[{label}]</span>}
    </div>
  );
}
