"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Badge from "@/components/Badge";
import { useJobs } from "@/lib/useJobs";

export default function JobDetailPage() {
  const { id } = useParams();
  const { jobs, ready, isSaved, toggleSaved } = useJobs();
  const job = jobs.find((j) => j.id === id);

  if (!ready) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-3xl px-5 sm:px-8 py-16 text-center text-muted">
          Loading…
        </main>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-3xl px-5 sm:px-8 py-16 text-center">
          <p className="font-mono text-xs uppercase tracking-widest2 text-amber mb-2">
            Board clear
          </p>
          <h1 className="text-2xl font-bold text-ink mb-2">
            This role isn&apos;t on the board
          </h1>
          <p className="text-muted mb-6">
            It may have been removed, or the link is out of date.
          </p>
          <Link href="/" className="text-amber hover:underline">
            ← Back to the board
          </Link>
        </main>
      </>
    );
  }

  const saved = isSaved(job.id);
  const subject = encodeURIComponent(`Application: ${job.title} (${job.id})`);
  const mailto = `mailto:${job.applyEmail}?subject=${subject}`;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 sm:px-8 py-10">
        <Link
          href="/"
          className="inline-block text-sm text-muted hover:text-ink mb-6"
        >
          ← Back to the board
        </Link>

        <div className="border border-line rounded-lg bg-board p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="font-mono text-xs text-muted">{job.id}</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-ink mt-1">
                {job.title}
              </h1>
              <p className="text-muted mt-1">
                {job.company} · {job.location}
              </p>
            </div>
            <Badge tone="open">Open</Badge>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge>{job.type}</Badge>
            <Badge>{job.category}</Badge>
            <Badge>{job.salary}</Badge>
            {job.tags?.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          <p className="text-ink/90 leading-relaxed mb-8">{job.description}</p>

          {job.responsibilities?.length > 0 && (
            <section className="mb-8">
              <h2 className="font-mono text-xs uppercase tracking-widest2 text-amber mb-3">
                What you&apos;ll do
              </h2>
              <ul className="space-y-2">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink/90">
                    <span className="text-amber mt-0.5">›</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {job.requirements?.length > 0 && (
            <section className="mb-8">
              <h2 className="font-mono text-xs uppercase tracking-widest2 text-amber mb-3">
                What you&apos;ll bring
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink/90">
                    <span className="text-amber mt-0.5">›</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-line">
            <a
              href={mailto}
              className="inline-flex items-center justify-center rounded bg-amber text-boarddeep font-semibold px-5 py-2.5 hover:bg-amber/90 transition-colors"
            >
              Apply by email
            </a>
            <button
              type="button"
              onClick={() => toggleSaved(job.id)}
              className={`inline-flex items-center justify-center rounded border px-5 py-2.5 font-medium transition-colors ${
                saved
                  ? "border-amber text-amber bg-amber/10"
                  : "border-line text-muted hover:text-ink hover:border-ink"
              }`}
            >
              {saved ? "★ Saved to your list" : "☆ Save for later"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
