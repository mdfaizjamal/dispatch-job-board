"use client";

import Link from "next/link";
import Badge from "./Badge";

export default function JobRow({ job, saved, onToggleSave, index = 0 }) {
  return (
    <div
      className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[100px_1fr_140px_120px_auto] items-center gap-3 sm:gap-4 border-b border-line px-4 sm:px-5 py-4 hover:bg-panel/60 transition-colors animate-flip"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <span className="hidden sm:block font-mono text-xs text-muted">
        {job.id}
      </span>

      <div className="min-w-0">
        <Link
          href={`/jobs/${job.id}`}
          className="block font-semibold text-ink hover:text-amber transition-colors truncate"
        >
          {job.title}
        </Link>
        <p className="text-sm text-muted truncate">
          {job.company} · {job.location}
        </p>
      </div>

      <span className="hidden sm:block text-sm text-muted font-mono">
        {job.type}
      </span>

      <span className="hidden sm:block">
        <Badge tone="open">Open</Badge>
      </span>

      <button
        type="button"
        onClick={() => onToggleSave(job.id)}
        aria-pressed={saved}
        aria-label={saved ? "Remove from saved" : "Save this role"}
        className={`justify-self-end shrink-0 rounded border px-2.5 py-1.5 text-xs font-mono transition-colors ${
          saved
            ? "border-amber text-amber bg-amber/10"
            : "border-line text-muted hover:text-ink hover:border-ink"
        }`}
      >
        {saved ? "★ Saved" : "☆ Save"}
      </button>
    </div>
  );
}
