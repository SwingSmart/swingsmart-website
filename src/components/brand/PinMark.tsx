export function PinMark({ className = "h-4 w-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 20"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 18V7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 2.2h5.4L9.3 5.2 11.4 8.2H6V2.2Z" fill="currentColor" />
      <circle cx="6" cy="18" r="1.35" fill="currentColor" />
    </svg>
  );
}
