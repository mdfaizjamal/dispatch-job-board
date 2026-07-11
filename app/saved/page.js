"use client";

import Link from "next/link";
import Header from "@/components/Header";
import JobRow from "@/components/JobRow";
import EmptyState from "@/components/EmptyState";
import { useJobs } from "@/lib/useJobs";

export default function SavedPage() {
  const { jobs, savedIds, ready, isSaved, toggleSaved } = useJobs();
  const saved = jobs.filter((j) => savedIds.includes(j.id));

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
        <p className="font-mono text-xs uppercase tracking-widest2 text-amber mb-2">
          Your shortlist
        </p>
        <h1 className="text-3xl font-bold text-ink mb-2">Saved roles</h1>
        <p className="text-muted mb-8">
          Roles you&apos;ve starred, kept on this device.
        </p>

        <div className="border border-line rounded-lg overflow-hidden bg-board">
          {!ready ? (
            <div className="px-5 py-10 text-center text-muted text-sm">
              Loading…
            </div>
          ) : saved.length === 0 ? (
            <div className="px-5 py-2">
              <EmptyState
                title="Nothing saved yet"
                hint="Star a role from the board to keep it here for later."
                action={
                  <Link
                    href="/"
                    className="inline-block mt-4 text-amber hover:underline text-sm"
                  >
                    Browse the board →
                  </Link>
                }
              />
            </div>
          ) : (
            saved.map((job, i) => (
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
