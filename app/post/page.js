"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useJobs } from "@/lib/useJobs";
import { categories, jobTypes } from "@/lib/jobsData";

const empty = {
  title: "",
  company: "",
  location: "",
  type: "Full-time",
  category: "Engineering",
  salary: "",
  description: "",
  applyEmail: "",
  tags: "",
};

export default function PostJobPage() {
  const router = useRouter();
  const { addJob } = useJobs();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Add a role title.";
    if (!form.company.trim()) e.company = "Add a company name.";
    if (!form.location.trim()) e.location = "Add a location (or “Remote”).";
    if (!form.description.trim()) e.description = "Add a short description.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.applyEmail))
      e.applyEmail = "Add a valid email address to receive applications.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const record = addJob({
      title: form.title.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      type: form.type,
      category: form.category,
      salary: form.salary.trim() || "Not disclosed",
      description: form.description.trim(),
      responsibilities: [],
      requirements: [],
      applyEmail: form.applyEmail.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    router.push(`/jobs/${record.id}`);
  };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-5 sm:px-8 py-10">
        <p className="font-mono text-xs uppercase tracking-widest2 text-amber mb-2">
          New listing
        </p>
        <h1 className="text-3xl font-bold text-ink mb-2">Post a role</h1>
        <p className="text-muted mb-8">
          Your listing appears at the top of the board immediately. It&apos;s
          saved on this device only — there&apos;s no shared database behind
          this demo board.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 border border-line rounded-lg bg-board p-6 sm:p-8"
        >
          <Field label="Role title" error={errors.title}>
            <input
              value={form.title}
              onChange={(e) => set({ title: e.target.value })}
              placeholder="e.g. Senior Frontend Engineer"
              className={inputClass(errors.title)}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Company" error={errors.company}>
              <input
                value={form.company}
                onChange={(e) => set({ company: e.target.value })}
                placeholder="e.g. Northwind Labs"
                className={inputClass(errors.company)}
              />
            </Field>
            <Field label="Location" error={errors.location}>
              <input
                value={form.location}
                onChange={(e) => set({ location: e.target.value })}
                placeholder="e.g. Remote — India"
                className={inputClass(errors.location)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Field label="Type">
              <select
                value={form.type}
                onChange={(e) => set({ type: e.target.value })}
                className={inputClass()}
              >
                {jobTypes.slice(1).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => set({ category: e.target.value })}
                className={inputClass()}
              >
                {categories.slice(1).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Salary (optional)">
              <input
                value={form.salary}
                onChange={(e) => set({ salary: e.target.value })}
                placeholder="e.g. ₹20L – ₹28L"
                className={inputClass()}
              />
            </Field>
          </div>

          <Field label="Description" error={errors.description}>
            <textarea
              value={form.description}
              onChange={(e) => set({ description: e.target.value })}
              rows={4}
              placeholder="What's this role about? What will they work on?"
              className={inputClass(errors.description)}
            />
          </Field>

          <Field label="Tags (comma separated, optional)">
            <input
              value={form.tags}
              onChange={(e) => set({ tags: e.target.value })}
              placeholder="e.g. React, Remote-friendly, Early career"
              className={inputClass()}
            />
          </Field>

          <Field
            label="Email to receive applications"
            error={errors.applyEmail}
          >
            <input
              type="email"
              value={form.applyEmail}
              onChange={(e) => set({ applyEmail: e.target.value })}
              placeholder="careers@yourcompany.com"
              className={inputClass(errors.applyEmail)}
            />
          </Field>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded bg-amber text-boarddeep font-semibold px-5 py-3 hover:bg-amber/90 transition-colors"
          >
            Publish to the board
          </button>
        </form>
      </main>
    </>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink mb-1.5">
        {label}
      </span>
      {children}
      {error && <span className="block text-xs text-closed mt-1.5">{error}</span>}
    </label>
  );
}

function inputClass(error) {
  return `w-full bg-boarddeep border rounded px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-amber outline-none ${
    error ? "border-closed" : "border-line"
  }`;
}
