export default function EmptyState({ title, hint, action }) {
  return (
    <div className="border border-dashed border-line rounded-lg py-16 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest2 text-muted mb-2">
        Board clear
      </p>
      <h3 className="text-lg font-semibold text-ink mb-1">{title}</h3>
      {hint && <p className="text-sm text-muted max-w-sm mx-auto">{hint}</p>}
      {action}
    </div>
  );
}
