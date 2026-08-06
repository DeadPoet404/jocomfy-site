
export function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} image placeholder`}
      className={`flex items-center justify-center bg-[#d1d1d1] bg-[repeating-linear-gradient(45deg,#d1d1d1,#d1d1d1_14px,#c3c3c3_14px,#c3c3c3_28px)] text-center ${className}`}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#17186b]/65">
        Image placeholder
      </span>
    </div>
  );
}
