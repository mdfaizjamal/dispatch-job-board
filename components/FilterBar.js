import { categories, jobTypes } from "@/lib/jobsData";

export default function FilterBar({ filters, onChange }) {
  const set = (patch) => onChange({ ...filters, ...patch });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-3 border border-line bg-panel rounded-lg p-3">
      <input
        type="text"
        value={filters.query}
        onChange={(e) => set({ query: e.target.value })}
        placeholder="Search title, company, or tag…"
        aria-label="Search roles"
        className="bg-board border border-line rounded px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-amber outline-none"
      />

      <select
        value={filters.category}
        onChange={(e) => set({ category: e.target.value })}
        aria-label="Filter by category"
        className="bg-board border border-line rounded px-3 py-2 text-sm text-ink focus:border-amber outline-none"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={filters.type}
        onChange={(e) => set({ type: e.target.value })}
        aria-label="Filter by job type"
        className="bg-board border border-line rounded px-3 py-2 text-sm text-ink focus:border-amber outline-none"
      >
        {jobTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(e) => set({ sort: e.target.value })}
        aria-label="Sort roles"
        className="bg-board border border-line rounded px-3 py-2 text-sm text-ink focus:border-amber outline-none"
      >
        <option value="newest">Newest first</option>
        <option value="title">Title A–Z</option>
        <option value="company">Company A–Z</option>
      </select>
    </div>
  );
}
