export default function Badge({ children, tone = "default" }) {
  const tones = {
    default: "bg-panel text-muted border-line",
    amber: "bg-amber/10 text-amber border-amber/30",
    open: "bg-open/10 text-open border-open/30",
  };
  return (
    <span
      className={`inline-flex items-center border rounded px-2 py-0.5 text-[11px] font-mono uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
