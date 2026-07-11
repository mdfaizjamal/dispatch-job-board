"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import JobRow from "@/components/JobRow";
import EmptyState from "@/components/EmptyState";
import { useJobs } from "@/lib/useJobs";

export default function HomePage() {
  const { jobs, ready, isSaved, toggleSaved } = useJobs();
  const [filters, setFilters] = useState({
    query: "",
    category: "All categories",
    type: "All types",
    sort: "newest",
  });

  const filtered = useMemo(() => {
    let list = [...jobs];
    const q = filters.query.trim().toLowerCase();

    if (q) {
      list = list.filter((j) =>
        [j.title, j.company, j.location, ...(j.tags || [])]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    if (filters.category !== "All categories") {
      list = list.filter((j) => j.category === filters.category);
    }
    if (filters.type !== "All types") {
      list = list.filter((j) => j.type === filters.type);
    }

    if (filters.sort === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sort === "company") {
      list.sort((a, b) => a.company.localeCompare(b.company));
    } else {
      list.sort((a, b) => (a.posted < b.posted ? 1 : -1));
    }

    return list;
  }, [jobs, filters]);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-amber mb-2">
              Now boarding
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-ink">
              Open roles, scanned at a glance
            </h1>
            <p className="text-muted mt-2 max-w-xl">
              {ready ? filtered.length : "—"} of {ready ? jobs.length : "—"}{" "}
              roles currently showing on the board.
            </p>
          </div>
          <Link
            href="/post"
            className="shrink-0 inline-flex items-center justify-center rounded bg-amber text-boarddeep font-semibold px-4 py-2.5 hover:bg-amber/90 transition-colors"
          >
            + Post a role
          </Link>
        </div>

        <div className="mb-6">
          <FilterBar filters={filters} onChange={setFilters} />
        </div>

        <div className="border border-line rounded-lg overflow-hidden bg-board">
          <div className="hidden sm:grid grid-cols-[100px_1fr_140px_120px_auto] gap-4 px-5 py-3 border-b border-line bg-panel/60 font-mono text-[11px] uppercase tracking-wide text-muted">
            <span>Req</span>
            <span>Role</span>
            <span>Type</span>
            <span>Status</span>
            <span className="text-right">Save</span>
          </div>

          {!ready ? (
            <div className="px-5 py-10 text-center text-muted text-sm">
              Loading board…
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-5 py-2">
              <EmptyState
                title="No roles match those filters"
                hint="Try clearing a filter or searching a broader term."
              />
            </div>
          ) : (
            filtered.map((job, i) => (
              <JobRow
                key={job.id}
                job={job}
                index={i}
                saved={isSaved(job.id)}
                onToggleSave={toggleSaved}
              />
            ))
          )}
        </div>
      </main>
    </>
  );
}
